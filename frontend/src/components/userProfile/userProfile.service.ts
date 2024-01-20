import { ApiClient } from "../../common/apiClient";
import { Friend, User } from "../../providers/currentUser/currentUser.type";

export interface UpdateProfile {
    username?: string;
    description?: string;
    profilePicture?: string;
    location?: string;
}

export const addFriendRest = async (apiClient: ApiClient, userId: string): Promise<Friend> => {
    const response = await apiClient.post<Friend>(`/user/${userId}/friend`);
    return response.data;
}

export const removeFriendRest = async (apiClient: ApiClient, userId: string): Promise<void> => {
    const response = await apiClient.delete<void>(`/user/${userId}/friend`);
    return response.data
}

export const editProfileRest = async (apiClient: ApiClient, id: string, data: UpdateProfile): Promise<User> => {
    const response = await apiClient.put<User>(`/user/${id}`, data);
    return response.data;
}