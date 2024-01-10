import { registerControllers } from './controller/registerControllers'
import {connectToDatabase} from './db/mongoClient'
import User from './model/User.model'
import { createServer } from './server/createServer'
import dotenv from 'dotenv'

function main() {
    dotenv.config()
    connectToDatabase()
        .then(() => {
            console.log('[INFO] Connected to database')
            const app = createServer()
            registerControllers(app)
            // test()
            app.listen(3000, () => {
                console.log('[INFO] Server listening on port 3000')
            })
        })
        .catch((err) => {
            console.error(err)
        })
}

main()

async function test(){
    const user = await User.findById("659da4652b4945a8f902f02f")
    console.log(user)
}