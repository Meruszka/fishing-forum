import { Schema, model } from 'mongoose'

const BadgeSchema = new Schema({
    name: String,
    icon: String,
})

const Badge = model('Badge', BadgeSchema)

export default Badge
