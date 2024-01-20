import { ApiClient } from "../../common/apiClient";
import { TicketDTO } from "./contact.type";

export const sendaTicketRest = async (apiClient: ApiClient, data: TicketDTO): Promise<number> => {
  const response = await apiClient.post<void>(`/ticket`, data);
  return response.status;
}