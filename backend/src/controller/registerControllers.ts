import express from 'express'
import { UserController } from './User.controller'
import { AuthController } from './Auth.controller'
import { TopicController } from './Topic.controller'
import { PostController } from './Post.controller'
import { FishingSpotController } from './FishingSpot.controller'

function registerControllers(app: express.Application): void {
    app.get('/health', (_, res) => {
        res.send({ status: 'UP' })
    })

    const userController = new UserController()
    app.use(userController.router)

    const authController = new AuthController()
    app.use(authController.router)

    const topicController = new TopicController()
    app.use(topicController.router)

    const postController = new PostController()
    app.use(postController.router)

    const fishingSpotController = new FishingSpotController()
    app.use(fishingSpotController.router)

    console.log('[INFO] Registered controllers')
}

export { registerControllers }
