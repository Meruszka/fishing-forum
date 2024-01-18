import { ApiClient } from "../../../common/apiClient";
import { Topic } from "../../../providers/currentUser/currentUser.type";

export const getTopicsREST = async (apiClient: ApiClient): Promise<Topic[]> => {
  const response = await apiClient.get<Topic[]>('/topic');
  return response.data;
}

export const getTopicREST = async (apiClient: ApiClient, id: string): Promise<Topic> => {
  const response = await apiClient.get<Topic>(`/topic/${id}`);
  return response.data;
}
