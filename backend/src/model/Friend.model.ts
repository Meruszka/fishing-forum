import { ObjectId, Schema, model } from 'mongoose'

interface IFriend {
    friend: {
        username: string
        _id: ObjectId
    }
    since: Date
}

const FriendSchema = new Schema({
    friend: { type: Schema.Types.ObjectId, ref: 'User' },
    since: Date,
})

const Friend = model('Friend', FriendSchema)

export default Friend

export { IFriend }
