import { useMutation } from "@tanstack/react-query";

import { resubmitSubmission } from "../services/submissionApi";

type ResubmitSubmissionVariables = {
  submissionId: string;
  answer: string;
  fileUrl: string | null;
};

export function useResubmitSubmission() {
  return useMutation({
    mutationFn: ({
      submissionId,
      answer,
      fileUrl,
    }: ResubmitSubmissionVariables) =>
      resubmitSubmission(submissionId, {
        answer,
        fileUrl,
      }),
  });
}
