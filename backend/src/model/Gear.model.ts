import { Schema, model } from 'mongoose'
import { z } from 'zod'

const GEAR_KINDS_VALUES = ['Rod', 'Reel', 'Bait', 'Line', 'Other'] as const

const GearSchema = new Schema({
    name: String,
    yearOfProduction: Number,
    kind: String,
})

const GearValidator = z.object({
    name: z.string().min(1).max(255),
    yearOfProduction: z.number().min(1900).max(2024),
    kind: z.enum(GEAR_KINDS_VALUES),
})

const Gear = model('Gear', GearSchema)

export default Gear
export { GearValidator }
