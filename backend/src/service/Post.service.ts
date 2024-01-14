import { Post, Response, Topic, User } from '../model'

class PostService {
    async getPostsByTopic(topicId: string) {
        try {
            const posts = await Post.find({ topic: topicId }).populate({
                path: 'author',
                select: 'username _id',
            })

            return posts
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async getPost(id: string) {
        try {
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

            if (!post) throw new Error('Post not found')

            return post
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async createPost(postData: any, topicId: string, authorId: string) {
        try {
            const topic = await Topic.findById(topicId)
            if (!topic) throw new Error('Topic not found')

            const newPost = new Post({
                ...postData,
                creationDate: new Date(),
                topic: topicId,
                author: authorId,
            })

            const savedPost = await newPost.save()

            await Topic.findByIdAndUpdate(topicId, {
                $inc: { numberOfPosts: 1 },
                lastPost: savedPost._id,
            })

            await User.findByIdAndUpdate(authorId, {
                $push: { posts: savedPost._id },
            })

            return savedPost
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async addResponse(postId: string, responseData: any, authorId: string) {
        try {
            const post = await Post.findById(postId)
            if (!post) throw new Error('Post not found')

            const newResponse = new Response({
                ...responseData,
                creationDate: new Date(),
                author: authorId,
                post: postId,
            })

            const savedResponse = await newResponse.save()

            await Post.findByIdAndUpdate(postId, {
                $push: { responses: savedResponse._id },
            })

            return savedResponse
        } catch (err) {
            console.error(err)
            return null
        }
    }
}

export { PostService }
