import { useMutation } from "@tanstack/react-query";

import { login } from "../api/authApi";
import { saveTokens, saveUser } from "../utils/token";

export function useLogin() {
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      saveTokens(data.token, data.refreshToken);

      saveUser({
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      });
    },
  });
}
