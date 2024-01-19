import { createContext } from "react";
import { IWebsocketContext } from "../../components/chat/chat.types";

export const WebsocketContext = createContext<IWebsocketContext|null>(null)