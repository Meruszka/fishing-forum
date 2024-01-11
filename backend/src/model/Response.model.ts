import { Schema, model } from 'mongoose'

const ResponseSchema = new Schema({
    content: String,
    creationDate: Date,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
})

const Response = model('Response', ResponseSchema)

export default Response
