import { FishingSpot, Friend, Gear, Post, User } from '../model'
import { IFriend } from '../model/Friend.model'
import { RANKS_POINTS } from '../model/constants'

class UserService {
    async getUser(id: string) {
        try {
            const user = await User.findById(id)
                .populate('posts', 'title creationDate _id')
                .populate('badges', 'name icon')
                .populate('gear', 'name kind _id')
                .populate({
                    path: 'friends',
                    populate: { path: 'friend', select: 'username profilePicture _id' },
                })
                .populate('fishingSpots', 'name image _id')

            if (!user) return { code: 404, error: 'User not found' }

            const { password, ...userWithoutPassword } = user.toObject()
            return { code: 200, data: userWithoutPassword }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async updateUser(id: string, userData: any) {
        try {
            const { username, description, location, profilePicture } = userData
            userData = { username, description, location, profilePicture }

            const user = await User.findById(id)
            if (!user) return { code: 404, error: 'User not found' }

            if (username && username !== user.username) {
                const isUsernameTaken = await User.exists({ username })
                if (isUsernameTaken) return { code: 400, error: 'Username is already taken' }
            }

            const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true, select: '-password' })
                .populate('posts', 'title creationDate _id')
                .populate('badges', 'name icon')
                .populate('gear', 'name kind _id')
                .populate({
                    path: 'friends',
                    populate: { path: 'friend', select: 'username profilePicture _id' },
                })
                .populate('fishingSpots', 'name image _id')

            if (!updatedUser) return { code: 404, error: 'User not found' }

            return { code: 200, data: updatedUser }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await User.findById(id)
            if (!user) return { code: 404, error: 'User not found' }

            const postsToDelete = user.posts.map((post) => post._id)
            const gearsToDelete = user.gear.map((gear) => gear._id)
            const fishingSpotsToDelete = user.fishingSpots.map((fishingSpot) => fishingSpot._id)

            await Promise.all([
                ...postsToDelete.map((postId) => Post.findByIdAndDelete(postId)),
                ...gearsToDelete.map((gearId) => Gear.findByIdAndDelete(gearId)),
                ...fishingSpotsToDelete.map((fishingSpotId) => FishingSpot.findByIdAndDelete(fishingSpotId)),
            ])

            await User.findByIdAndDelete(id)
            return { code: 200, data: 'User successfully deleted' }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async addFriend(userId: string, friendId: string) {
        try {
            const user = await User.findById(userId).populate<{ friends: IFriend[] }>({
                path: 'friends',
                populate: {
                    path: 'friend',
                    select: 'username _id',
                },
            })

            if (!user) return { code: 404, error: 'User not found' }

            const friend = await User.findById(friendId)
            if (!friend) return { code: 404, error: 'Friend not found' }

            if (userId === friendId) return { code: 400, error: 'Cannot add yourself' }

            // Check if already friends
            const isFriend = user.friends.some((friend) => friend.friend._id.toString() === friendId)
            if (isFriend) return { code: 400, error: 'Already friends' }

            const newFriend = new Friend({ friend: friendId, dateOfFriendship: new Date() })
            await newFriend.save()

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { friends: newFriend._id } },
                { new: true }
            )
            return { code: 200, data: updatedUser }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async removeFriend(userId: string, friendId: string) {
        try {
            const user = await User.findById(userId).populate<{ friends: IFriend[] }>({
                path: 'friends',
                populate: {
                    path: 'friend',
                    select: 'username _id',
                },
            })

            if (!user) return { code: 404, error: 'User not found' }

            const friend = await User.findById(friendId)
            if (!friend) return { code: 404, error: 'Friend not found' }

            if (userId === friendId) return { code: 400, error: 'Cannot remove yourself' }

            // Check if already friends
            const isFriend = user.friends.some((friend) => friend.friend._id.toString() === friendId)
            if (!isFriend) return { code: 400, error: 'Not friends' }

            const friendToDelete = user.friends.find((friend) => friend.friend._id.toString() === friendId)
            if (!friendToDelete) return { code: 404, error: 'Friend not found' }

            await Friend.findByIdAndDelete(friendToDelete._id)

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { friends: friendToDelete._id } },
                { new: true }
            )
            return { code: 200, data: updatedUser }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async addGear(userId: string, gearData: any) {
        try {
            const gear = await new Gear(gearData).save()

            if (!gear) return { code: 400, error: 'Gear not created' }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $push: { gear: gear._id } },
                { new: true }
            ).populate({
                path: 'gear',
                select: 'name kind yearOfProduction _id',
            })

            return { code: 200, data: updatedUser }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async removeGear(userId: string, gearId: string) {
        try {
            const user = await User.findById(userId).populate<{ gear: IFriend[] }>({
                path: 'gear',
                select: 'name kind yearOfProduction _id',
            })

            if (!user) return { code: 404, error: 'User not found' }

            const gearToDelete = user.gear.find((gear) => gear._id.toString() === gearId)
            if (!gearToDelete) return { code: 404, error: 'Gear not found' }

            await Gear.findByIdAndDelete(gearToDelete._id)

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { gear: gearToDelete._id } },
                { new: true }
            )
            return { code: 200, data: updatedUser }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    static async runPointsUpdate(id: string) {
        // get points and assign rank
        const user = await User.findById(id)
        if (!user) return

        const points = user.score
        if (!points) return

        let rank: string | null = null
        for (const [rankName, rankPoints] of Object.entries(RANKS_POINTS)) {
            if (points >= rankPoints) {
                rank = rankName
            }
        }

        if (rank && user.rank !== rank) {
            await User.findByIdAndUpdate(id, { $set: { rank } })
        }
    }

    static async runBadgesUpdate(id: string) {}

    async getUserByUsername(username: string) {
        try {
            const users = await User.find({ username: { $regex: new RegExp(username, 'i') } }).select(
                'username profilePicture _id'
            )
            return { code: 200, data: users }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }
}

export { UserService }
