import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTeacherAssignment } from "../services/assignmentApi";
import type { UpdateAssignmentRequest } from "../types/assignment";

export function useUpdateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAssignmentRequest }) =>
      updateTeacherAssignment(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-assignments"],
      });
    },
  });
}
