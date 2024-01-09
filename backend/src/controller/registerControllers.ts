import express from 'express'

import { UserController } from "./User.controller";

function registerControllers(app: express.Application) {
    const userController = new UserController()
    app.use(userController.router)
    console.log('[INFO] Registered controllers')
}

export { registerControllers }