import React, { ReactNode } from "react";
import ApiClient from "../../common/apiClient";
import { ApiContext } from "./apiContext.context";

// Define a provider component
interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const apiClient = ApiClient;

  return (
    <ApiContext.Provider value={{ apiClient }}>{children}</ApiContext.Provider>
  );
};
