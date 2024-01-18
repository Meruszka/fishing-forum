import { Schema, model } from 'mongoose'
import { z } from 'zod'

const FISHING_SPOT_TYPES_VALUES = ['Lake', 'River', 'Pond', 'Other'] as const

const FishingSpotSchema = new Schema({
    name: String,
    longitude: Number,
    latitude: Number,
    description: String,
    rating: Number,
    type: String,
    image: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
})

const FishingSpotValidator = z.object({
    name: z.string().min(1).max(255),
    longitude: z.number().min(-180).max(180),
    latitude: z.number().min(-90).max(90),
    description: z.string().min(1).max(255),
    rating: z.number().min(0).max(5),
    type: z.enum(FISHING_SPOT_TYPES_VALUES),
    image: z.string().min(1).max(512),
})

const FishingSpot = model('FishingSpot', FishingSpotSchema)

export default FishingSpot
export { FishingSpotValidator }
