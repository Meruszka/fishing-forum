import { Request, Response, Router } from 'express'
import { PostService } from '../service'
import { RequestWithUser, verifyTokenMiddleware } from '../middleware/Auth.middleware'

class PostController {
    public router: Router
    private path: string = '/post'
    private postService: PostService

    constructor() {
        this.router = Router()
        this.postService = new PostService()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(`${this.path}/:id`, this.getPost)
        this.router.get(`${this.path}/topic/:id`, this.getPostsByTopic)
        this.router.post(`${this.path}/topic/:id`, verifyTokenMiddleware, this.createPost)
        this.router.post(`${this.path}/:id`, verifyTokenMiddleware, this.addResponse)
    }

    private getPostsByTopic = async (req: Request, res: Response) => {
        const posts = await this.postService.getPostsByTopic(req.params.id)
        if (!posts) {
            res.status(404).send({ message: 'Posts not found' })
            return
        }
        res.send(posts)
    }

    private getPost = async (req: Request, res: Response) => {
        const post = await this.postService.getPost(req.params.id)
        if (!post) {
            res.status(404).send({ message: 'Post not found' })
            return
        }
        res.send(post)
    }

    private createPost = async (req: RequestWithUser, res: Response) => {
        const post = req.body
        if (!post || !post.title || !post.content) {
            res.status(400).send({ message: 'Invalid post' })
            return
        }
        const topicId = req.params.id
        const authorId = req.user?._id
        if (!authorId) {
            res.status(401).send({ message: 'Access Denied: No Token Provided!' })
            return
        }
        const newPost = await this.postService.createPost(post, topicId, authorId)
        if (!newPost) {
            res.status(400).send({ message: 'Post not created' })
            return
        }
        res.send(newPost)
    }

    private addResponse = async (req: RequestWithUser, res: Response) => {
        const response = req.body
        if (!response || !response.content) {
            res.status(400).send({ message: 'Invalid response' })
            return
        }
        const postId = req.params.id
        const authorId = req.user?._id
        if (!authorId) {
            res.status(401).send({ message: 'Access Denied: No Token Provided!' })
            return
        }
        const newResponse = await this.postService.addResponse(postId, response, authorId)
        if (!newResponse) {
            res.status(400).send({ message: 'Response not created' })
            return
        }
        res.send(newResponse)
    }
}

export { PostController }
