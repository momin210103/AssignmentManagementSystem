import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTeacherAssign } from "../services/teacherAssignApi";

export const useCreateTeacherAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTeacherAssign,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teacherAssign"],
      });
    },
  });
};
