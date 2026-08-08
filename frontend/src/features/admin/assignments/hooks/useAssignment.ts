import { useQuery } from "@tanstack/react-query";

import { getAssignments } from "../services/assignmentApi";

export const useAssignment = () => {
  return useQuery({
    queryKey: ["assignments"],
    queryFn: getAssignments,
  });
};
