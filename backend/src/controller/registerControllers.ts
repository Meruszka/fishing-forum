import express from 'express'

import { UserController } from "./User.controller";
import { AuthController } from './Auth.controller';

function registerControllers(app: express.Application): void {
    const userController = new UserController()
    app.use(userController.router)

    const authController = new AuthController()
    app.use(authController.router)
    console.log('[INFO] Registered controllers')
}

export { registerControllers }