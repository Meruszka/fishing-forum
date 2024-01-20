import { FishingSpot, User } from '../model'

class FishingSpotService {
    async getFishingSpots() {
        try {
            const fishingSpots = await FishingSpot.find().populate('author', 'username profilePicture _id')
            return { code: 200, data: fishingSpots }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async getFishingSpot(id: string) {
        try {
            const fishingSpot = await FishingSpot.findById(id).populate('author', 'username profilePicture _id')

            if (!fishingSpot) {
                return { code: 404, error: 'FishingSpot not found' }
            }

            return { code: 200, data: fishingSpot }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async updateFishingSpot(id: string, fishingSpotData: any) {
        try {
            const fishingSpot = await FishingSpot.findByIdAndUpdate(id, fishingSpotData, { new: true })
            if (!fishingSpot) {
                return { code: 404, error: 'FishingSpot not found' }
            }
            return { code: 200, data: fishingSpot }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async addFishingSpot(fishingSpotData: any, authorId: string) {
        try {
            const user = await User.findById(authorId)
            if (!user) {
                return { code: 404, error: 'User not found' }
            }

            const newFishingSpot = new FishingSpot({ ...fishingSpotData, author: user._id })
            const savedFishingSpot = await newFishingSpot.save()

            await User.findByIdAndUpdate(authorId, { $push: { fishingSpots: savedFishingSpot._id } })

            return { code: 201, data: savedFishingSpot }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async deleteFishingSpot(id: string, authorId: string) {
        try {
            const fishingSpot = await FishingSpot.findById(id)
            if (!fishingSpot) {
                return { code: 404, error: 'FishingSpot not found' }
            }
            if (fishingSpot.author && fishingSpot.author.toString() !== authorId) {
                return { code: 403, error: 'Access Denied: You are not the author of this fishingSpot' }
            }
            await FishingSpot.findByIdAndDelete(id)
            await User.findByIdAndUpdate(authorId, { $pull: { fishingSpots: id } })
            return { code: 200, data: 'FishingSpot deleted' }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }
}

export { FishingSpotService }
