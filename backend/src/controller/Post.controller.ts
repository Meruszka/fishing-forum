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
        const result = await this.postService.getPostsByTopic(req.params.id)
        if (result.error) {
            return res.status(result.code).send({ error: result.error })
        }
        res.send(result.data)
    }

    private getPost = async (req: Request, res: Response) => {
        const result = await this.postService.getPost(req.params.id)
        if (result.error) {
            return res.status(result.code).send({ error: result.error })
        }
        res.send(result.data)
    }

    private createPost = async (req: RequestWithUser, res: Response) => {
        const post = req.body
        if (!post || !post.title || !post.content) {
            return res.status(400).send({ error: 'Invalid post' })
        }
        const topicId = req.params.id
        const authorId = req.user?._id
        if (!authorId) {
            return res.status(401).send({ error: 'Access Denied: No Token Provided!' })
        }
        const result = await this.postService.createPost(post, topicId, authorId)
        if (result.error) {
            return res.status(result.code).send({ error: result.error })
        }
        res.status(201).send(result.data)
    }

    private addResponse = async (req: RequestWithUser, res: Response) => {
        const response = req.body
        if (!response || !response.content) {
            return res.status(400).send({ error: 'Invalid response' })
        }
        const postId = req.params.id
        const authorId = req.user?._id
        if (!authorId) {
            return res.status(401).send({ error: 'Access Denied: No Token Provided!' })
        }
        const result = await this.postService.addResponse(postId, response, authorId)
        if (result.error) {
            return res.status(result.code).send({ error: result.error })
        }
        res.status(201).send(result.data)
    }
}

export { PostController }
