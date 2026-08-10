import { useMutation } from "@tanstack/react-query";

import { uploadSubmissionFile } from "../services/submissionApi";

export function useUploadSubmissionFile() {
  return useMutation({
    mutationFn: (file: File) => uploadSubmissionFile(file),
  });
}
