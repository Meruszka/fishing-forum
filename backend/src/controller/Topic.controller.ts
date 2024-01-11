import { Request, Response, Router } from "express"
import { TopicService } from "../service/Topic.service"

class TopicController {
    public router: Router
    private path: string = '/topic'
    private topicService: TopicService

    constructor() {
        this.router = Router()
        this.topicService = new TopicService()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(`${this.path}`, this.getTopics)
        this.router.get(`${this.path}/:id`, this.getTopic)
    }

    private getTopics = async (req: Request, res: Response) => {
        const topics = await this.topicService.getTopics()
        res.send(topics)
    }

    private getTopic = async (req: Request, res: Response) => {
        const topic = await this.topicService.getTopic(req.params.id)
        if (!topic) {
            res.status(404).send({ message: 'Topic not found' })
            return
        }
        res.send(topic)
    }
}

export { TopicController }