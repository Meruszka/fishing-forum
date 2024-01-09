import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    username: String,
    dateOfRegistration: Date,
    description: String,
    profilePicture: String,
    location: String,
    score: Number,
    rank: String,
    password: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    badges: [{ type: Schema.Types.ObjectId, ref: 'Badge' }],
    gear: [{ type: Schema.Types.ObjectId, ref: 'Gear' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }],
})

const User = model('User', UserSchema)

export default User
