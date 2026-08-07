import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  getToken,
  getUser,
  removeToken,
  removeUser,
  saveToken,
  saveUser,
} from "@/features/auth/utils/token";

export interface AuthUser {
  fullName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

export default function AuthProvider({
  children,
}: Props) {
  const [token, setToken] = useState<string | null>(null);

  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setToken(getToken());
    setUser(getUser());
  }, []);

  function login(
    token: string,
    user: AuthUser
  ) {
    saveToken(token);
    saveUser(user);

    setToken(token);
    setUser(user);
  }

  function logout() {
    removeToken();
    removeUser();

    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token,

      login,
      logout,
    }),
    [token, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}