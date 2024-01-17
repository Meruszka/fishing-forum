import { Schema, model } from 'mongoose'

const MessageSchema = new Schema({
    content: String,
    date: Date,
    isRead: Boolean,
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Message = model('Message', MessageSchema)

export default Message
