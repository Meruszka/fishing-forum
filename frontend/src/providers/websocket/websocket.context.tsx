import { createContext } from "react";

interface WebsocketContext {
    isReady: boolean
    val: any
    send: (data: string) => void
}

export const WebsocketContext = createContext<WebsocketContext|null>(null)