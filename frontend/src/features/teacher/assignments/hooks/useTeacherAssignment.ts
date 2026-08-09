import { useQuery } from "@tanstack/react-query";

import { getTeacherAssignments } from "../services/assignmentApi";

export function useTeacherAssignments() {
  return useQuery({
    queryKey: ["teacher-assignments"],
    queryFn: getTeacherAssignments,
  });
}
