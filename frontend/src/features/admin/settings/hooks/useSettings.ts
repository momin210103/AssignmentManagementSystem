import { useQuery } from "@tanstack/react-query";

import { getSettings } from "@/features/admin/settings/services/settingsApi";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
}
