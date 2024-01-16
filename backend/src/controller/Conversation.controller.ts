import { Request, Response, Router } from 'express'
import { RequestWithUser, verifyTokenMiddleware } from '../middleware/Auth.middleware'
import { ConversationService } from '../service'

class ConversationController {
    public router: Router
    private path: string = '/conversation'
    private conversationService: ConversationService

    constructor() {
        this.router = Router()
        this.conversationService = new ConversationService()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:interlocutorId`, verifyTokenMiddleware, this.getConversation)
        this.router.get(`${this.path}`, verifyTokenMiddleware, this.getConversations)
        this.router.post(`${this.path}`, verifyTokenMiddleware, this.sendMessage)
    }

    private getConversation = async (req: RequestWithUser, res: Response) => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }

        const { _id: userId } = req.user
        const { interlocutorId } = req.params

        const conversation = await this.conversationService.getConversation(userId, interlocutorId)
        if (conversation && conversation.code === 200) {
            res.status(200).json(conversation.data)
        } else {
            res.status(conversation.code).json({ error: conversation.error })
        }
    }

    private getConversations = async (req: RequestWithUser, res: Response) => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }

        const { _id: userId } = req.user

        const conversations = await this.conversationService.getConversations(userId)
        if (conversations && conversations.code === 200) {
            res.status(200).json(conversations.data)
        } else {
            res.status(conversations.code).json({ error: conversations.error })
        }
    }

    private sendMessage = async (req: RequestWithUser, res: Response) => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }

        const { _id: userId } = req.user
        const { interlocutorId, content } = req.body

        const message = await this.conversationService.sendMessage(userId, interlocutorId, content)
        if (message && message.code === 200) {
            res.status(200).json(message.data)
        } else {
            res.status(message.code).json({ error: message.error })
        }
    }
}

export { ConversationController }
