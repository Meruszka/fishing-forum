import { createContext } from "react";
import { WebsocketMessage } from "./websocket.provider";

interface WebsocketContext {
    isReady: boolean
    val: WebsocketMessage | null
    send: (data: string) => void
}

export const WebsocketContext = createContext<WebsocketContext|null>(null)