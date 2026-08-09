import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTeacherAssignment } from "../services/assignmentApi";

export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeacherAssignment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-assignments"],
      });
    },
  });
}