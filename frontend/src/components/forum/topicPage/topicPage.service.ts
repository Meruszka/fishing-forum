import { ApiClient } from "../../../common/apiClient";
import { Post, Response, User } from "../../../providers/currentUser/currentUser.type";

export const getPostsByTopicREST = async (apiClient: ApiClient, topicId: string): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>(`/post/topic/${topicId}/`);
  return response.data;
}

export const getPostByIdREST = async (apiClient: ApiClient, id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(`/post/${id}`);
  return response.data;
}

export const addResponseForPostId = async (apiClient: ApiClient, postId: string, content: string): Promise<Response> => {
  const request = {content: content}
  const response = await apiClient.post<Response>(`/post/${postId}`, request);
  return response.data;
}

export const getUserById = async (apiClient: ApiClient, userId: string): Promise<User> => {
  const response = await apiClient.get<User>(`/user/${userId}`)
  return response.data
}

// export const deletePostById = async (apiClient: ApiClient, postId: string): Promise<void> =>{

// }