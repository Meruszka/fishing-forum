import { FishingSpot, Friend, Gear, Post, User } from '../model'
import { IFriend } from '../model/Friend.model'

class UserService {
    async getUser(id: string) {
        try {
            const user = await User.findById(id)
                .populate({
                    path: 'posts',
                    select: 'title creationDate _id',
                })
                .populate({
                    path: 'badges',
                    select: 'name icon',
                })
                .populate({
                    path: 'gear',
                    select: 'name kind _id',
                })
                .populate({
                    path: 'friends',
                    populate: {
                        path: 'friend',
                        select: 'username _id',
                    },
                })
                .populate({
                    path: 'fishingSpots',
                    select: 'name image _id',
                })

            if (user) {
                const { _id, password, ...userWithoutPassword } = user.toObject()
                return { id: _id, ...userWithoutPassword }
            } else {
                return null
            }
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async updateUser(id: string, userData: any) {
        try {
            await User.findByIdAndUpdate(id, userData, { new: true })
            const updatedUser = await User.findById(id)
            return updatedUser
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async deleteUser(id: string) {
        try {
            const user = await User.findById(id)
            if (!user) return null

            const postsToDelete = user.posts.map((post) => post._id)
            const gearsToDelete = user.gear.map((gear) => gear._id)
            const fishingSpotsToDelete = user.fishingSpots.map((fishingSpot) => fishingSpot._id)

            await Promise.all([
                ...postsToDelete.map((postId) => Post.findByIdAndDelete(postId)),
                ...gearsToDelete.map((gearId) => Gear.findByIdAndDelete(gearId)),
                ...fishingSpotsToDelete.map((fishingSpotId) => FishingSpot.findByIdAndDelete(fishingSpotId)),
            ])

            const deletedUser = await User.findByIdAndDelete(id)
            return deletedUser
        } catch (err) {
            console.error(err)
            return null
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
}

export { UserService }
