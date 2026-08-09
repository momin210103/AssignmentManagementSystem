import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gradeSubmission } from "../services/assignmentApi";

export function useGradeSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      data,
    }: {
      submissionId: string;
      data: {
        marks: number;
        feedback: string;
      };
    }) => gradeSubmission(submissionId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["assignment-submissions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["assignment-submissions", variables.submissionId],
      });
    },
  });
}
