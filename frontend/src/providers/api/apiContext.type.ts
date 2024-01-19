import ApiClient from "../../common/apiClient";

export interface ApiContextProps {
  apiClient: typeof ApiClient;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}
