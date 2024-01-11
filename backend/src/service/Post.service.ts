import { Post, Response, Topic } from '../model'

class PostService {
    async getPostsByTopic(topicId: string) {
        const posts = await Post.find({ topic: topicId })
            .populate({
                path: 'author',
                select: 'username _id',
            })
            .exec()
            .then((posts) => {
                return posts
            })
            .catch((err) => {
                console.error(err)
                return null
            })
        return posts
    }

    async getPost(id: string) {
        const post = await Post.findById(id)
            .populate({
                path: 'author',
                select: 'username _id',
            })
            .populate({
                path: 'responses',
                populate: {
                    path: 'author',
                    select: 'username _id',
                },
            })
            .populate({
                path: 'topic',
                select: 'name _id',
            })
            .exec()
            .then((post) => {
                return post
            })
            .catch((err) => {
                console.error(err)
                return null
            })
        return post
    }

    async createPost(post: any, topicId: string, authorId: string) {
        const topic = await Topic.findById(topicId)
        if (!topic) throw new Error('Topic not found')
        const newPost = new Post({
            title: post.title,
            content: post.content,
            creationDate: new Date(),
            topic: topicId,
            type: 'Default',
            author: authorId,
        })
            .save()
            .then(async (post) => {
                await Topic.findOneAndUpdate(
                    { _id: topicId },
                    {
                        $inc: { numberOfPosts: 1 },
                        lastPost: post._id,
                    }
                )
                return post
            })
            .catch((err) => {
                console.error(err)
                return null
            })
        return newPost
    }

    async addResponse(postId: string, response: any, authorId: string) {
        const post = await Post.findById(postId)
        if (!post) throw new Error('Post not found')
        const newResponse = new Response({
            content: response.content,
            creationDate: new Date(),
            author: authorId,
            post: postId,
        })
            .save()
            .then(async (response) => {
                await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $push: { responses: response._id },
                    }
                )
                return response
            })
            .catch((err) => {
                console.error(err)
                return null
            })
        return newResponse
    }
}

export { PostService }
