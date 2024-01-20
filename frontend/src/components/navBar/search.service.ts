import { ApiClient } from "../../common/apiClient";
import { ConversationMember } from "../chat/chat.types";

export const getUsers = async (apiClient: ApiClient, searchTerm: string): Promise<ConversationMember[]> => {
  const response = await apiClient.get<ConversationMember[]>(`/user/username/${searchTerm}`);
  return response.data;
}