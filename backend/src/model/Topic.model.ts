import { Schema, model } from 'mongoose'

const TopicSchema = new Schema({
    name: String,
    description: String,
    numberOfPosts: Number,
    lastPost: { type: Schema.Types.ObjectId, ref: 'Post' },
})

const Topic = model('Topic', TopicSchema)

export default Topic
