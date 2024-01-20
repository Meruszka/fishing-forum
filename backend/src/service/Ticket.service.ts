import { Ticket } from '../model'

class TicketService {
    public async createTicket(data: any) {
        try {
            const ticket = await Ticket.create(data)
            return { code: 201, data: ticket }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }
}

export { TicketService }
