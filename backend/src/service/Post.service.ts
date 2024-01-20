import { Post, Response, Topic, User } from '../model'
import { UserService } from './User.service'

class PostService {
    async getPostsByTopic(topicId: string) {
        try {
            const posts = await Post.find({ topic: topicId })
                .populate('author', 'username _id')
                .populate({
                    path: 'lastResponse',
                    populate: { path: 'author', select: 'username profilePicture _id' },
                })
                .sort({ creationDate: -1 })
            return { code: 200, data: posts }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async getPost(id: string) {
        try {
            const post = await Post.findById(id)
                .populate('author', 'username _id')
                .populate({
                    path: 'responses',
                    populate: { path: 'author', select: 'username _id' },
                })
                .populate('topic', 'name _id')

            if (!post) {
                return { code: 404, error: 'Post not found' }
            }

            return { code: 200, data: post }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async deletePost(id: string, authorId: string) {
        try {
            const post = await Post.findById(id)
            if (!post) {
                return { code: 404, error: 'Post not found' }
            }

            if (!post.author || post.author.toString() !== authorId) {
                return { code: 403, error: 'Forbidden' }
            }

            await Post.findByIdAndDelete(id)
            await Topic.findByIdAndUpdate(post.topic, { $inc: { numberOfPosts: -1 } })
            await User.findByIdAndUpdate(authorId, { $pull: { posts: id } })

            return { code: 200, data: { message: 'Post deleted' } }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async deleteResponse(id: string, authorId: string) {
        try {
            const response = await Response.findById(id)
            if (!response) {
                return { code: 404, error: 'Response not found' }
            }

            if (!response.author || response.author.toString() !== authorId) {
                return { code: 403, error: 'Forbidden' }
            }

            await Response.findByIdAndDelete(id)
            await Post.findByIdAndUpdate(response.post, { $pull: { responses: id } })
            const post = await Post.findById(response.post)

            if (!post) {
                return { code: 500, error: 'That should not happen' }
            }

            if (post.responses.length > 0) {
                const lastResponse = post.responses[post.responses.length - 1]
                await Post.findByIdAndUpdate(response.post, { lastResponse })
            } else {
                await Post.findByIdAndUpdate(response.post, { lastResponse: null })
            }

            return { code: 200, data: { message: 'Response deleted' } }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async getRecentPosts(count: number) {
        try {
            const posts = await Post.find()
                .sort({ creationDate: -1 })
                .limit(count)
                .populate('author', 'username profilePicture _id')

            return { code: 200, data: posts }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async createPost(postData: any, topicId: string, authorId: string) {
        try {
            const topic = await Topic.findById(topicId)
            if (!topic) {
                return { code: 404, error: 'Topic not found' }
            }

            const newPost = new Post({ ...postData, creationDate: new Date(), topic: topicId, author: authorId })
            const savedPost = await newPost.save()

            await Topic.findByIdAndUpdate(topicId, { $inc: { numberOfPosts: 1 }, lastPost: savedPost._id })
            await User.findByIdAndUpdate(authorId, { $push: { posts: savedPost._id } })
            // add 10 points to the author
            await User.findByIdAndUpdate(authorId, { $inc: { score: 10 } })
            UserService.runPointsUpdate(authorId)

            const populatedPost = await Post.findById(savedPost._id).populate('author', 'username _id')

            return { code: 201, data: populatedPost }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async addResponse(postId: string, responseData: any, authorId: string) {
        try {
            const post = await Post.findById(postId)
            if (!post) {
                return { code: 404, error: 'Post not found' }
            }

            const newResponse = new Response({
                ...responseData,
                creationDate: new Date(),
                author: authorId,
                post: postId,
            })
            const savedResponse = await newResponse.save()

            await Post.findByIdAndUpdate(postId, { $push: { responses: savedResponse._id } })
            await Post.findByIdAndUpdate(postId, { lastResponse: savedResponse._id })
            // add 1 point to the post author
            if (post.author) {
                await User.findByIdAndUpdate(post.author, { $inc: { score: 1 } })
                UserService.runPointsUpdate(post.author.toString())
            }
            // add 5 points to the author
            await User.findByIdAndUpdate(authorId, { $inc: { score: 5 } })
            UserService.runPointsUpdate(authorId)

            const populatedResponse = await Response.findById(savedResponse._id).populate('author', 'username _id')

            return { code: 201, data: populatedResponse }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }
}

export { PostService }
