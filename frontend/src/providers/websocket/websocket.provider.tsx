import React, { useEffect, useRef, useState } from "react"
import { WebsocketContext } from "./websocket.context"

interface WebsocketContextProps {
    children: React.ReactNode
}

export interface WebsocketMessage {
    action: string
    error?: string
    data?: object
}

export const WebsocketProvider: React.FC<WebsocketContextProps> = ({
     children 
}) => {
    const [isReady, setIsReady] = useState(false)
    const [val, setVal] = useState<WebsocketMessage | null>(null)
  
    const ws = useRef<WebSocket | null>(null)
  
    useEffect(() => {
      const socket = new WebSocket("wss://localhost:5000/ws")
  
      socket.onopen = () => setIsReady(true)
      socket.onclose = () => setIsReady(false)
      socket.onmessage = (event) =>{
        const data = JSON.parse(event.data) as WebsocketMessage
        setVal(data)
      }
  
      ws.current = socket
  
      return () => {
        socket.close()
      }
    }, [])
  
    const send = (data: string) => {
        ws.current?.send(data)
    }
  
    return (
    <WebsocketContext.Provider value={{ isReady, val, send }}>
        {children}
      </WebsocketContext.Provider>
    )
  }