import { useQuery } from "@tanstack/react-query";

import { getAssignmentSubmissions } from "../services/assignmentApi";

export function useAssignmentSubmissions(assignmentId: string) {
  return useQuery({
    queryKey: ["assignment-submissions", assignmentId],
    queryFn: () => getAssignmentSubmissions(assignmentId),
    enabled: !!assignmentId,
  });
}
