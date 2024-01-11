import { registerControllers } from './controller/registerControllers'
import { connectToDatabase } from './db/mongoClient'
import { Badge } from './model'
import { createServer } from './server/createServer'
import dotenv from 'dotenv'

function main() {
    dotenv.config()
    connectToDatabase()
        .then(() => {
            console.log('[INFO] Connected to database')
            const app = createServer()
            registerControllers(app)
            test()
            app.listen(3000, () => {
                console.log('[INFO] Server listening on port 3000')
            })
        })
        .catch((err) => {
            console.error(err)
        })
}

main()

async function test() {
    // new Badge({
    //     name: 'Pierwszy post',
    //     icon: 'first_post.png',
    // }).save().then((badge) => {
    //     console.log(badge)
    // }).catch((err) => {
    //     console.error(err)
    // })
    // new Badge({
    //     name: 'Wyjadacz',
    //     icon: 'wyjadacz.png',
    // }).save().then((badge) => {
    //     console.log(badge)
    // }
    // ).catch((err) => {
    //     console.error(err)
    // })
    // new Topic({
    //     name: 'Topic o rybkach',
    //     description: 'Rybki itp',
    //     numberOfPosts: 0,
    //     lastPost: null
    // }).save().then((topic) => {
    //     console.log(topic)
    // }).catch((err) => {
    //     console.error(err)
    // })
    // new Topic({
    //     name: 'Topic o programowaniu',
    //     description: 'fajne ',
    //     numberOfPosts: 0,
    //     lastPost: null
    // }).save().then((topic) => {
    //     console.log(topic)
    // }).catch((err) => {
    //     console.error(err)
    // })
}
