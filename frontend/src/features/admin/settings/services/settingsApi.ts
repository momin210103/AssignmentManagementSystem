import { api } from "@/api/axios";

import type {
  ApplicationSettings,
  UpdateSettingsRequest,
} from "../types/settings";

export async function getSettings(): Promise<ApplicationSettings> {
  const response = await api.get<ApplicationSettings>("/admin/settings");

  return response.data;
}

export async function updateSettings(
  request: UpdateSettingsRequest,
): Promise<ApplicationSettings> {
  const response = await api.put<ApplicationSettings>(
    "/admin/settings",
    request,
  );

  return response.data;
}
