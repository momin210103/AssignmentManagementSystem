import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "../services/profileApi";

export function useMyProfile() {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });
}
