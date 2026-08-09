import { useQuery } from "@tanstack/react-query";

import { getTeacherAssignmentOptions } from "../services/assignmentApi";

export function useTeacherAssignmentOptions() {
  return useQuery({
    queryKey: ["teacher-assignment-options"],
    queryFn: getTeacherAssignmentOptions,
  });
}
