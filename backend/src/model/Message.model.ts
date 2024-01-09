import { Schema, model } from 'mongoose'

const MessageSchema = new Schema({
    content: String,
    date: Date,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    isRead: Boolean,
})

const Message = model('Message', MessageSchema)

export default Message
