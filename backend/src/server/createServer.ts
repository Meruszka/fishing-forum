import express from 'express'
import morgan from 'morgan'

function createServer() {
    const app = express()
    app.use(express.json())
    app.use(morgan('dev'))
    return app
}

export { createServer }
