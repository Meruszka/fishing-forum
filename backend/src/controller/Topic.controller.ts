import { Request, Response, Router } from 'express'
import { TopicService } from '../service/Topic.service'

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
        if (topics.error) {
            return res.status(topics.code).send({ error: topics.error })
        }
        res.send(topics.data)
    }

    private getTopic = async (req: Request, res: Response) => {
        const topic = await this.topicService.getTopic(req.params.id)
        if (topic.error) {
            return res.status(topic.code).send({ error: topic.error })
        }
        res.send(topic.data)
    }
}

export { TopicController }
