import { ApiClient } from "../../common/apiClient";
import { User } from "../../providers/currentUser/currentUser.type";

export interface UpdateProfile {
  username?: string;
  description?: string;
  profilePicture?: string;
  location?: string;
}

export const editProfileRest = async (apiClient: ApiClient, id: string, data: UpdateProfile): Promise<User> => {
  const response = await apiClient.put<User>(`/user/${id}`, data);
  return response.data;
}