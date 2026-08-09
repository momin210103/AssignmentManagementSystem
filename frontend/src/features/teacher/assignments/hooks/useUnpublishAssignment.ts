import { useMutation, useQueryClient } from "@tanstack/react-query";

import { unpublishAssignment } from "../services/assignmentApi";

export function useUnpublishAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unpublishAssignment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-assignments"],
      });
    },
  });
}
