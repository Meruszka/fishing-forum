import { useContext } from "react";
import { ApiContext } from "./apiContext.context";

export const useApiClient = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiClient must be used within an ApiProvider");
  }
  return context;
};
