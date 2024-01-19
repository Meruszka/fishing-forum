import React, { ReactNode } from "react";
import ApiClient from "../../common/apiClient";
import { ApiContext } from "./apiContext.context";

// Define a provider component
interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const apiClient = ApiClient;
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(
    apiClient.isLoggedIn()
  );
  return (
    <ApiContext.Provider value={{ apiClient, isLoggedIn, setIsLoggedIn }}>
      {children}
    </ApiContext.Provider>
  );
};
