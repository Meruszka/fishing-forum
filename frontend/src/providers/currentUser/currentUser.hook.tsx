import { useContext } from "react";
import { CurrentUserContext } from "./currentUser.context";

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error(
      "useCurrentUser must be used within an CurrentUserProvider"
    );
  }
  return context.currentUser;
};
