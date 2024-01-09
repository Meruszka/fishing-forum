import mongoose from 'mongoose'

async function connectToDatabase() {
    await mongoose.connect('mongodb://fishing-admin:super-secret@127.0.0.1:27017/fishing-forum')
}

export default connectToDatabase
