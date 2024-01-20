import { Router, Request, Response } from 'express'
import { TicketValidator } from '../model/Ticket.model'
import { TicketService } from '../service'

class TicketController {
    public router: Router
    private path: string = '/ticket'
    private ticketService: TicketService

    constructor() {
        this.router = Router()
        this.ticketService = new TicketService()
        this.initRoutes()
    }

    private initRoutes() {
        this.router.post(`${this.path}`, this.createTicket)
    }

    private createTicket = async (req: Request, res: Response) => {
        const data = req.body
        const validationResult = TicketValidator.safeParse(data)
        if (!validationResult.success) {
            res.status(400).send({ message: validationResult.error.format() })
            return
        }
        const ticket = await this.ticketService.createTicket(data)
        res.status(ticket.code).send(ticket)
    }
}

export { TicketController }
