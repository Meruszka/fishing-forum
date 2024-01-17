import { createContext } from "react";
import { ApiContextProps } from "./apiContext.type";

export const ApiContext = createContext<ApiContextProps | null>(null);
