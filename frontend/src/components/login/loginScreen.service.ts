import { ApiClient, LoginResponse } from "../../common/apiClient";

export const handleLoginRest = async (apiClient: ApiClient, username: string, password: string): Promise<LoginResponse> => {
  return await apiClient.login({
      username,
      password,
  });
}

export const handleRegisterRest = async (apiClient: ApiClient, username: string, password: string): Promise<LoginResponse> => {
  return await apiClient.register({
    username,
    password,
  });
}