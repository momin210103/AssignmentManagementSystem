import { useQuery } from "@tanstack/react-query";
import { getStudentAssignments } from "../services/studentAssignmentsApi";

export const useStudentAssignments = () => {
  return useQuery({
    queryKey: ["studentAssignments"],
    queryFn: getStudentAssignments,
  });
};
