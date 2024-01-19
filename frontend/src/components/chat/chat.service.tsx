import { ApiClient } from "../../common/apiClient";
import { Conversation, ConversationMember, SendMessageRequest, SendMesssageResponse } from "./chat.types";

export const getConversations = async (apiClient: ApiClient): Promise<Conversation[]> => {
    const response = await apiClient.get<Conversation[]>("/conversation");
    return response.data;
};

export const getUsers = async (apiClient: ApiClient, searchTerm: string): Promise<ConversationMember[]> => {
    const response = await apiClient.get<ConversationMember[]>(`/user/username/${searchTerm}`);
    return response.data;
}

export const getConversation = async (apiClient: ApiClient, userId: string): Promise<Conversation> => {
    const response = await apiClient.get<Conversation>(`/conversation/${userId}`);
    return response.data;
}

export const sendMessage = async (apiClient: ApiClient, data: SendMessageRequest): Promise<SendMesssageResponse> => {
    const response = await apiClient.post<SendMesssageResponse>("/conversation", data);
    return response.data;
}

export const markAsRead = async (apiClient: ApiClient, conversationId: string): Promise<void> => {
    await apiClient.put(`/conversation/${conversationId}`);
}