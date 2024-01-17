import { WSRequest, WSResponse, getClients } from '../server/createWSserver'

class WebSocketController {
    public static handleMessage = async (message: WSRequest): Promise<WSResponse> => {
        switch (message.action) {
            case 'ping':
                return WebSocketController.ping()
            default:
                return { action: 'error', error: 'Invalid action' }
        }
    }

    public static ping = (): WSResponse => {
        const clientCount = getClients().size
        return { action: 'ping', data: { response: 'pong', clientCount } }
    }
}

export { WebSocketController }
