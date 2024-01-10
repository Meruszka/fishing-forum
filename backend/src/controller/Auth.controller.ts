import { Router, Request, Response } from 'express'
import { AuthService } from '../service/Auth.service'

class AuthController {
    public router: Router
    private path: string = '/user'
    private authService: AuthService

    constructor() {
        this.router = Router()
        this.authService = new AuthService()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
    }

    private login = async (req: Request, res: Response) => {
        const username = req.body.username
        const password = req.body.password
        await this.authService.login(username, password)
            .then((token) => {
                res.send({ token })
            })
            .catch((err) => {
                res.status(400).send({ message: err.message })
            })
    }

    private register = async (req: Request, res: Response) => {
        const username = req.body.username
        const password = req.body.password
        if (!username || !password) {
            res.status(400).send({ message: 'Invalid credentials' })
            return
        }
        this.authService.register(username, password)
            .then((token) => {
                res.send({ token })
            })
            .catch((err) => {
                res.status(400).send({ message: err.message })
            })
    }
}

export { AuthController }