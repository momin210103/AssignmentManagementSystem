import { createContext } from "react";

export interface AuthUser {
  fullName: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;

  login: (token: string, user: AuthUser) => void;

  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
