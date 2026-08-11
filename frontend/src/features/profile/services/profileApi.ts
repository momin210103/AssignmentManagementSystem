import { api } from "@/api/axios";

import type { MyProfile } from "../types/profile";

export const getMyProfile = async (): Promise<MyProfile> => {
  const response = await api.get<MyProfile>("/profile/me");

  return response.data;
};
