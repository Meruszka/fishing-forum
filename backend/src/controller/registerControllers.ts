import express from 'express'
import { UserController } from './User.controller'
import { AuthController } from './Auth.controller'
import { TopicController } from './Topic.controller'
import { PostController } from './Post.controller'

function registerControllers(app: express.Application): void {
    const userController = new UserController()
    app.use(userController.router)

    const authController = new AuthController()
    app.use(authController.router)

    const topicController = new TopicController()
    app.use(topicController.router)

    const postController = new PostController()
    app.use(postController.router)

    console.log('[INFO] Registered controllers')
}

export { registerControllers }
