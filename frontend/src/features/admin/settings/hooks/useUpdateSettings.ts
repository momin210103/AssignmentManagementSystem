import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSettings } from "@/features/admin/settings/services/settingsApi";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });
}
