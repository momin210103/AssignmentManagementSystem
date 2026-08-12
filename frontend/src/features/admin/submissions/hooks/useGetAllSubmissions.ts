import { useQuery } from "@tanstack/react-query";
import { getAllSubmissions } from "../services/submissionApi";

export function useGetAllSubmissions() {
  return useQuery({
    queryKey: ["submissions"],
    queryFn: getAllSubmissions,
  });
}
