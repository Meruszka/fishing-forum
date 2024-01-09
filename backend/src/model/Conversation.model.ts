import { Schema, model } from 'mongoose'

const ConversationSchema = new Schema({
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
})

const Conversation = model('Conversation', ConversationSchema)

export default Conversation
