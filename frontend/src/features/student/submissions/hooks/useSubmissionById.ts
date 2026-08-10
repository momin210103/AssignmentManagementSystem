import { useQuery } from "@tanstack/react-query";

import { getMySubmissionById } from "../services/submissionApi";

export function useMySubmissionById(submissionId: string) {
  return useQuery({
    queryKey: ["my-submission", submissionId],
    queryFn: () => getMySubmissionById(submissionId),
    enabled: !!submissionId,
  });
}
