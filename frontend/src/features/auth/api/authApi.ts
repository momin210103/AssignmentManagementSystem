import { api } from "@/api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function login(request: LoginRequest) {
  const response = await api.post<LoginResponse>("/auth/login", request);

  return response.data;
}
