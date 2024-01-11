import { Schema, model } from 'mongoose'

const PostSchema = new Schema({
    title: String,
    content: String,
    creationDate: Date,
    type: String,
    topic: { type: Schema.Types.ObjectId, ref: 'Topic' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    responses: [{ type: Schema.Types.ObjectId, ref: 'Response' }],
})

const Post = model('Post', PostSchema)

export default Post
