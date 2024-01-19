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
  const { apiClient, isLoggedIn } = useApiClient();
  useEffect(() => {
    if (isLoggedIn) {
      apiClient.getCurrentUser().then((res) => {
        setCurrentUser(res.data);
      });
    } else {
      setCurrentUser(null);
    }
  }, [apiClient, isLoggedIn]);


  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
