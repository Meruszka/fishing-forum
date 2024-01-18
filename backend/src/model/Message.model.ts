import { Schema, model } from 'mongoose'
import { z } from 'zod'

const MessageSchema = new Schema({
    content: String,
    date: Date,
    isRead: Boolean,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
})

const MessageValidator = z.object({
    content: z.string().min(1).max(255),
    interlocutorId: z.string().min(1).max(32),
})

const Message = model('Message', MessageSchema)

export default Message
export { MessageValidator }
