import { useMutation } from "@tanstack/react-query";
import type { CreateSubmissionRequest } from "../types/submissions";
import { createSubmission } from "../services/submissionApi";

export function useCreateSubmission() {
  return useMutation({
    mutationFn: (data: CreateSubmissionRequest) => createSubmission(data),
  });
}
