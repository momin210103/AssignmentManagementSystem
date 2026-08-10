import { useQuery } from "@tanstack/react-query";

import { getAssignmentById } from "../services/assignmentApi";

export function useAssignmentById(id: string) {
  return useQuery({
    queryKey: ["assignment", id],
    queryFn: () => getAssignmentById(id),
    enabled: !!id,
  });
}
