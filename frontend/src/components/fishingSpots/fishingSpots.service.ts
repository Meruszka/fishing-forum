import { ApiClient } from "../../common/apiClient";
import { FishingSpot } from "../../providers/currentUser/currentUser.type";

export interface FishingSpotDTO {
  name: string,
  longitude: number,
  latitude: number,
  description: string,
  rating: number,
  type: string,
  image: string,
}

export const newFishingSpotREST = async (apiClient: ApiClient, fishingSpot: FishingSpotDTO): Promise<FishingSpot> => {
  const response = await apiClient.post<FishingSpot>('/fishingSpot', fishingSpot);
  return response.data;
}

export const getFishingSpotsREST = async (apiClient: ApiClient): Promise<FishingSpot[]> => {
  const response = await apiClient.get<FishingSpot[]>('/fishingSpot');
  return response.data;
}

export const deleteFishingSpotREST = async (apiClient: ApiClient, id: string): Promise<void> => {
  const response = await apiClient.delete<void>(`/fishingSpot/${id}`);
  return response.data;
}

export const updateFishingSpotREST = async (apiClient: ApiClient, id: string, fishingSpot: FishingSpotDTO): Promise<FishingSpot> => {
  const response = await apiClient.patch<FishingSpot>(`/fishingSpot/${id}`, fishingSpot);
  return response.data;
}
