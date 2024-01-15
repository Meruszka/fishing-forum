import mongoose from 'mongoose'

async function connectToDatabase() {
    const url: string = `mongodb://fishing-admin:super-secret@${
        process.env.MONGO_HOST || '127.0.0.1'
    }:27017/fishing-forum`
    await mongoose.connect(url)
}

export { connectToDatabase }
