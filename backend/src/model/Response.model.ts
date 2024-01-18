import { Schema, model } from 'mongoose'
import { z } from 'zod'

const ResponseSchema = new Schema({
    content: String,
    creationDate: Date,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
})

const ResponseValidator = z.object({
    content: z.string().min(1).max(255),
})

const Response = model('Response', ResponseSchema)

export default Response
export { ResponseValidator }
