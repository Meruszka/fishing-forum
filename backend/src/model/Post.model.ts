import { Schema, model } from 'mongoose'

const PostSchema = new Schema({
    title: String,
    content: String,
    creationDate: Date,
    type: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Post = model('Post', PostSchema)

export default Post
