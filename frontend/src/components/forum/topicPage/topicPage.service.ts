import { ApiClient } from "../../../common/apiClient";
import { Post } from "../../../providers/currentUser/currentUser.type";

export const getPostsByTopicREST = async (apiClient: ApiClient, topicId: string): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>(`/post/topic/${topicId}/`);
  return response.data;
}

export const getPostByIdREST = async (apiClient: ApiClient, id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(`/post/${id}`);
  return response.data;
}
