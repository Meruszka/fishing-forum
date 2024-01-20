export interface ConversationMember {
    _id: string;
    username: string;
    profilePicture: string;
}

export interface Conversation {
    _id: string;
    members: ConversationMember[];
    messages: Message[];
    lastMessage: Message;
}

export interface Message {
    _id: string;
    content: string;
    date: string;
    isRead: boolean;
    sender: {
        _id: string;
        username: string;
    };
}

export interface SendMessageRequest {
    interlocutorId: string;
    content: string;
}

export interface SendMesssageResponse {
    _id: string;
    content: string;
    date: string;
    isRead: boolean;
    sender: string;
}

export interface IWebsocketContext {
    isReady: boolean
    onlineCount: number
    val: WebsocketMessage | null
    send: (data: string) => void
    clearMessage: () => void
}

export interface WebsocketMessageOut {
    token: string
    action: string
    data?: object
}


interface WebsocketNewMessage {
    action: 'newMessage';
    data: {
        conversationId: string;
        message: Message;
    };
}

interface WebsocketPingMessage {
    action: 'ping';
    data: {
        clientCount: number;
        response: 'pong';
    };
}

interface WebsocketErrorMessage {
    action: 'error';
    data: {
        error: string;
    };
}

export type WebsocketMessage = WebsocketNewMessage | WebsocketPingMessage | WebsocketErrorMessage;
