import { Schema, model } from 'mongoose'
import { z } from 'zod'

const TicketSchema = new Schema({
    email: String,
    content: String,
    creationDate: Date,
})

const Ticket = model('Ticket', TicketSchema)

const TicketValidator = z.object({
    email: z.string().email(),
    content: z.string().min(1).max(255),
})

export default Ticket
export { TicketValidator }
