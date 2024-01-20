import { ApiClient } from "../../common/apiClient";
import { Friend } from "../../providers/currentUser/currentUser.type";

export const addFriend = async (apiClient: ApiClient, userId: string): Promise<Friend> => {
    const response = await apiClient.post<Friend>(`/user/${userId}/friend`);
    return response.data;
}

export const removeFriend = async (apiClient: ApiClient, userId: string): Promise<void> => {
    const response = await apiClient.delete<void>(`/user/${userId}/friend`);
    return response.data
}