import React, { useEffect, useRef, useState } from "react"
import { WebsocketContext } from "./websocket.context"
import { WebsocketMessage } from "../../components/chat/chat.types"

interface WebsocketContextProps {
  children: React.ReactNode
}

export const WebsocketProvider: React.FC<WebsocketContextProps> = ({
  children
}) => {
  const [isReady, setIsReady] = useState(false)
  const [val, setVal] = useState<WebsocketMessage | null>(null)
  const token = localStorage.getItem("token") || ""
  const [onlineCount, setOnlineCount] = useState(0)

  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000/ws")

    socket.onopen = () => {
      setIsReady(true)
      ping(socket, token)
    }
    socket.onclose = () => setIsReady(false)
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data) as WebsocketMessage
      setVal(data)
      if (data.action === "ping" && data.data?.clientCount) {
        setOnlineCount(data.data.clientCount)
      }
    }

    ws.current = socket

    return () => {
      socket.close()
    }
  }, [token])

  const send = (data: string) => {
    ws.current?.send(data)
  }

  return (
    <WebsocketContext.Provider value={{ isReady, onlineCount, val, send }}>
      {children}
    </WebsocketContext.Provider>
  )
}

function ping(ws: WebSocket, token: string) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify({
      token: token,
      action: "ping"
    }));
  }
  setTimeout(() => {
    ping(ws, token);
  }, 10000);
}


