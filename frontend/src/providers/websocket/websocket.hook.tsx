import { useContext } from "react";
import { WebsocketContext } from "./websocket.context";

export const useWebsocket = () => {
  const context = useContext(WebsocketContext);
  if (!context) {
    throw new Error(
      "useWebsocket must be used within an WebsocketProvider"
    );
  }
  return context;
};