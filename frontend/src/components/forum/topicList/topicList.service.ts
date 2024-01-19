import { ApiClient } from "../../../common/apiClient";
import { Topic, Post } from "../../../providers/currentUser/currentUser.type";

export const getTopicsREST = async (apiClient: ApiClient): Promise<Topic[]> => {
  const response = await apiClient.get<Topic[]>('/topic');
  return response.data;
}

export const getTopicREST = async (apiClient: ApiClient, id: string): Promise<Topic> => {
  const response = await apiClient.get<Topic>(`/topic/${id}`);
  return response.data;
}

export const addPostforTopicId = async (apiClient: ApiClient, topicId: string, title: string, content: string): Promise<Post> => {
  const request = {title: title, content: content}
  const response = await apiClient.post<Post>(`/post/topic/${topicId}`, request);
  return response.data;
}

export const getLastPosts = async (apiClient: ApiClient): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/post');
  return response.data;
}
