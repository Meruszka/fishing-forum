import { createContext } from "react";
import { CurrentUserContextProps } from "./currentUser.type";

export const CurrentUserContext = createContext<
  CurrentUserContextProps | undefined
>(undefined);
