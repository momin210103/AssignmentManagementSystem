import { useQuery } from "@tanstack/react-query";

import { getAssignmentById } from "../services/assignmentApi";

export function useGetAssignmentById(id: string) {
  return useQuery({
    queryKey: ["assignment", id],
    queryFn: () => getAssignmentById(id),
    enabled: !!id,
  });
}
