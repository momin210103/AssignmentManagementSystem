import { useMutation } from "@tanstack/react-query";
import { login } from "../api/authApi";
// import { saveToken } from "../utils/token";



export function useLogin() {
  return useMutation({
    mutationFn: login,
    // onSuccess: (data) => {
    //   saveToken(data.token);
    //   console.log("Login successful:", data);
    // }
  });
}
