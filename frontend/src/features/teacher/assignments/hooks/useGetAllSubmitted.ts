import { useQuery } from "@tanstack/react-query";
import { getTeacherSubmissions } from "../services/assignmentApi";

export function useGetAllSubmitted() {
  return useQuery({
    queryKey: ["teacher-submissions"],
    queryFn: () => getTeacherSubmissions(),
  });
}
