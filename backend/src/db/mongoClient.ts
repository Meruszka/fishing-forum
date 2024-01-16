import mongoose from 'mongoose'

async function connectToDatabase() {
    const username = process.env.MONGO_USERNAME || 'fishing-admin'
    const password = process.env.MONGO_PASSWORD || 'super-secret'
    const host = process.env.MONGO_HOST || '127.0.0.1'
    const port = process.env.MONGO_PORT || '27017'
    const database = process.env.MONGO_DATABASE || 'fishing-forum'
    const url: string = `mongodb://${username}:${password}@${host}:${port}/${database}`
    await mongoose.connect(url)
}

export { connectToDatabase }
