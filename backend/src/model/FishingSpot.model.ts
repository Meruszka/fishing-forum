import { Schema, model } from 'mongoose'

const FishingSpotSchema = new Schema({
    name: String,
    longitude: Number,
    latitude: Number,
    description: String,
    rating: Number,
    type: String,
    image: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
})

const FishingSpot = model('FishingSpot', FishingSpotSchema)

export default FishingSpot
