import { Schema, model } from 'mongoose'
import { z } from 'zod'

const FISHING_SPOT_TYPES_VALUES = ['Lake', 'River', 'Pond', 'Other', 'Sea', 'Ocean'] as const

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

const FishingSpotUpdateValidator = z.object({
    name: z.string().min(1).max(255).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    description: z.string().min(1).max(255).optional(),
    rating: z.number().min(0).max(5).optional(),
    type: z.enum(FISHING_SPOT_TYPES_VALUES).optional(),
    image: z.string().min(1).max(512).optional(),
})

const FishingSpot = model('FishingSpot', FishingSpotSchema)

export default FishingSpot
export { FishingSpotValidator, FishingSpotUpdateValidator }
