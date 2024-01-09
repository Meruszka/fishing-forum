import { Schema, model } from 'mongoose'

const ResponseSchema = new Schema({
    content: String,
    date: Date,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
})

const Response = model('Response', ResponseSchema)

export default Response
