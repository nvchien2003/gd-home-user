import { useState } from "react";
import type { User } from "../api/user/user.interface";
import type { ResponseInterface } from "../common/interface/abstracts.interface";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth/auth.api";
import { AuthContext } from "./auth.context";
import { queryKeys } from "../api/queryKeys";

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
    queryClient.invalidateQueries({ queryKey: queryKeys.subscription });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    queryClient.removeQueries({ queryKey: ["me"] });
    queryClient.removeQueries({ queryKey: queryKeys.subscription });
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
