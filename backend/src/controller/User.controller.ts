import { Router, Request, Response } from 'express'
import { UserService } from '../service/User.service'
import { RequestWithUser, verifyToken } from '../middleware/Auth.middleware'

class UserController {
    public router: Router
    private path: string = '/user'
    private userService: UserService

    constructor() {
        this.router = Router()
        this.userService = new UserService()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(`${this.path}/:id`, this.getUser)
        this.router.put(`${this.path}/:id`, verifyToken, this.updateUser)
        this.router.delete(`${this.path}/:id`, verifyToken, this.deleteUser)
        this.router.post(`${this.path}/:id/friend`, verifyToken, this.addFriend)
        this.router.delete(`${this.path}/:id/friend`, verifyToken, this.removeFriend)
    }

    private getUser = async (req: Request, res: Response) => {
        const id = req?.params?.id
        if (!id) {
            res.status(400).send({ message: 'Missing id' })
            return
        }
        const user = await this.userService.getUser(id)
        if (!user) {
            res.status(404).send({ message: 'User not found' })
            return
        }
        res.send(user)
    }

    private updateUser = async (req: RequestWithUser, res: Response) => {
        const id = req.params.id
        if (!req.user || req.user._id !== id) {
            res.status(403).send({ message: 'Forbidden' })
            return
        }
        const user = req.body
        const updatedUser = await this.userService.updateUser(id, user)
        res.send(updatedUser)
    }

    private deleteUser = async (req: RequestWithUser, res: Response) => {
        const id = req.params.id
        if (!req.user || req.user._id !== id) {
            res.status(403).send({ message: 'Forbidden' })
            return
        }
        const deletedUser = await this.userService.deleteUser(id)
        res.send(deletedUser)
    }

    private addFriend = async (req: RequestWithUser, res: Response) => {
        const userId = req.user?._id
        const friendId = req.params.id

        if (!userId) {
            res.status(401).json({ error: 'Access Denied: No Token Provided!' })
            return
        }

        const result = await this.userService.addFriend(userId, friendId)

        if (result.error) {
            res.status(result.code).json({ error: result.error })
            return
        }

        res.json(result.data)
    }

    private removeFriend = async (req: RequestWithUser, res: Response) => {
        const userId = req.user?._id
        const friendId = req.params.id

        if (!userId) {
            res.status(401).json({ error: 'Access Denied: No Token Provided!' })
            return
        }

        const result = await this.userService.removeFriend(userId, friendId)

        if (result.error) {
            res.status(result.code).json({ error: result.error })
            return
        }

        res.json(result.data)
    }
}

export { UserController }
