import { registerControllers } from './controller/registerControllers'
import { connectToDatabase } from './db/mongoClient'
import { createServer } from './server/createHTTPserver'
import dotenv from 'dotenv'
import { createWSserver } from './server/createWSserver'
import seedDB from './db/seedDB'

function main() {
    dotenv.config()
    connectToDatabase()
        .then(async () => {
            console.log('[INFO] Connected to database')
            await seedDB()
            const app = createServer()
            registerControllers(app)
            const server = app.listen(5000, () => {
                console.log('[INFO] Server listening on port 5000')
            })
            createWSserver(server)
        })
        .catch((err) => {
            console.error(err)
        })
}

main()
