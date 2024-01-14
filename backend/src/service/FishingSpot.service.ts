import { FishingSpot, User } from '../model'

class FishingSpotService {
    async getFishingSpots() {
        try {
            const fishingSpots = await FishingSpot.find().populate({
                path: 'author',
                select: 'username _id',
            })
            return fishingSpots
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async getFishingSpot(id: string) {
        try {
            const fishingSpot = await FishingSpot.findById(id).populate({
                path: 'author',
                select: 'username _id',
            })

            if (!fishingSpot) throw new Error('FishingSpot not found')

            return fishingSpot
        } catch (err) {
            console.error(err)
            return null
        }
    }

    async addFishingSpot(fishingSpotData: any, authorId: string) {
        try {
            const user = await User.findById(authorId)
            if (!user) throw new Error('User not found')

            const newFishingSpot = new FishingSpot({
                ...fishingSpotData,
                author: user._id,
            })

            const savedFishingSpot = await newFishingSpot.save()

            await User.findByIdAndUpdate(authorId, { $push: { fishingSpots: savedFishingSpot._id } })

            return savedFishingSpot
        } catch (err) {
            console.error(err)
            return null
        }
    }
}

export { FishingSpotService }
