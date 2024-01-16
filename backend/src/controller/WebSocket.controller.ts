import { WSRequest, WSResponse } from '../server/createWSserver'

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
        return { action: 'ping', data: 'pong' }
    }
}

export { WebSocketController }
