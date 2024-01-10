import { Router, Request, Response } from 'express'
import { UserService } from '../service/User.service'

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
        this.router.put(`${this.path}/:id`, this.updateUser)
        this.router.delete(`${this.path}/:id`, this.deleteUser)
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

    private updateUser = async (req: Request, res: Response) => {
        const id = req.params.id
        const user = req.body
        const updatedUser = await this.userService.updateUser(id, user)
        res.send(updatedUser)
    }

    private deleteUser = async (req: Request, res: Response) => {
        const id = req.params.id
        const deletedUser = await this.userService.deleteUser(id)
        res.send(deletedUser)
    }
}

export { UserController }