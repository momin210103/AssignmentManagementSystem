import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeStudentFromClass } from "../services/classApi";

export function useRemoveStudentFromClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      classId,
      studentId,
    }: {
      classId: string;
      studentId: string;
    }) => removeStudentFromClass(classId, studentId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["class-students", variables.classId],
      });
    },
  });
}
