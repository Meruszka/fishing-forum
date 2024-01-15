import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

function createServer() {
    const app = express()
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(cors())
    return app
}

export { createServer }
