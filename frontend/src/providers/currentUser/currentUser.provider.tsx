import { useEffect, useState } from "react";
import { CurrentUserContext } from "./currentUser.context";
import { User } from "./currentUser.type";
import { useApiClient } from "../api/apiContext.hook";

interface CurrentUserProviderProps {
  children: React.ReactNode;
}

export const CurrentUserProvider: React.FC<CurrentUserProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const apiClient = useApiClient();
  useEffect(() => {
    apiClient.getCurrentUser().then((res) => {
      setCurrentUser(res.data);
    });
  }, [apiClient]);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
