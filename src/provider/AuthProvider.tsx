import { createContext, useContext, useState } from "react";
import type { User } from "../api/user/user.interface";
import type { ResponseInterface } from "../common/interface/abstracts.interface";
import {
  type RefetchOptions,
  type QueryObserverResult,
  useQueryClient,
  useQuery,
} from "@tanstack/react-query";
import { authApi } from "../api/auth/auth.api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ResponseInterface<User>, Error>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const {
    data,
    refetch,
  } = useQuery<ResponseInterface<User>>({
    queryKey: ["me"],
    queryFn: authApi.getProfile,
    enabled: !!token && token !== "undefined",
    staleTime: Infinity,
    retry: false,
  });

  const user = data?.data ?? null;

  const login = (newToken: string, newUser: User) => {
    if (!newToken) return;

    localStorage.setItem("token", newToken);
    setToken(newToken);
    queryClient.setQueryData(["me"], {
      data: newUser,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);

    // 🔥 clear cache
    queryClient.removeQueries({ queryKey: ["me"] });

    window.location.href = "/sign-in";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: Boolean(token && token !== "undefined"),
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};