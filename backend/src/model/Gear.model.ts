import { Schema, model } from 'mongoose'

const GearSchema = new Schema({
    name: String,
    yearOfProduction: Number,
    kind: String,
})

const Gear = model('Gear', GearSchema)

export default Gear
