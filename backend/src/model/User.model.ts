import { Schema, model } from 'mongoose'
import { z } from 'zod'

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
    fishingSpots: [{ type: Schema.Types.ObjectId, ref: 'FishingSpot' }],
})

const UserUpdateValidator = z.object({
    username: z.string().min(3).max(20).optional(),
    description: z.string().max(1000).optional(),
    location: z.string().max(100).optional(),
    profilePicture: z.string().url().optional(),
})

const User = model('User', UserSchema)

export default User

export { UserUpdateValidator }
