import { WebSocketServer } from 'ws'
import { WebSocketController } from '../controller'
import { verifyToken } from '../middleware/Auth.middleware'

interface UnverifiedWSRequest {
    token: string
    action: string
    data: any
}

interface WSRequest {
    user: {
        _id: string
        iat: number
    }
    action: string
    data: any
}

interface WSResponse {
    action: string
    error?: string
    data?: any
}

const clients = new Map()

function createWSserver(app: any) {
    const wss = new WebSocketServer({
        noServer: true,
        path: '/ws',
    })

    app.on('upgrade', (request: any, socket: any, head: any) => {
        wss.handleUpgrade(request, socket, head, (socket: any) => {
            wss.emit('connection', socket, request)
        })
    })

    wss.on('connection', (ws: any, req: any) => {
        ws.on('message', async (message: any) => {
            try {
                const json = JSON.parse(message) as UnverifiedWSRequest
                if (!json.token) {
                    ws.send(JSON.stringify({ error: 'No token provided' }))
                    return
                }
                const verified = verifyToken(json.token)
                if (!verified) {
                    ws.send(JSON.stringify({ error: 'Invalid token' }))
                    return
                }
                const verifiedWSRequest: WSRequest = {
                    user: verified,
                    action: json.action,
                    data: json.data,
                }
                if (verifiedWSRequest.user && verifiedWSRequest.user._id) {
                    clients.set(verifiedWSRequest.user._id, ws)
                    ws.userId = verifiedWSRequest.user._id
                }
                const response = await WebSocketController.handleMessage(verifiedWSRequest)
                ws.send(JSON.stringify(response))
            } catch (err) {
                console.error(err)
                ws.send(JSON.stringify({ error: 'Something went wrong' }))
            }
        })
        ws.on('close', () => {
            const userId = ws.userId
            if (userId) clients.delete(userId)
        })
    })

    return wss
}

function sendWSMessage(userId: string, message: WSResponse) {
    try {
        const client = clients.get(userId)
        if (client) {
            client.send(JSON.stringify(message))
        }
    } catch (err) {
        console.error(err)
    }
}

function getClients() {
    return clients
}

export { createWSserver, sendWSMessage, getClients }
export type { WSRequest, WSResponse }
