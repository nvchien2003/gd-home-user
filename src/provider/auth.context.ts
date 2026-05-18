import { createContext, useContext } from "react";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";
import type { User } from "../api/user/user.interface";
import type { ResponseInterface } from "../common/interface/abstracts.interface";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ResponseInterface<User>, Error>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
