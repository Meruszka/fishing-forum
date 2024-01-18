import { Schema, model } from 'mongoose'
import { z } from 'zod'

const PostSchema = new Schema({
    title: String,
    content: String,
    creationDate: Date,
    type: String,
    lastResponse: { type: Schema.Types.ObjectId, ref: 'Response' },
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }],
})

const PostValidator = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(255),
})

const Post = model('Post', PostSchema)

export default Post
export { PostValidator }
