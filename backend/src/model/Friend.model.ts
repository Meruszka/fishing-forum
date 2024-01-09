import { Schema, model } from 'mongoose'

const FriendSchema = new Schema({
    friend: { type: Schema.Types.ObjectId, ref: 'User' },
    since: Date,
})

const Friend = model('Friend', FriendSchema)

export default Friend
