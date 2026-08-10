import { useQuery } from "@tanstack/react-query";

import { getMySubmissions } from "../services/submissionApi";

export function useMySubmissions() {
  return useQuery({
    queryKey: ["my-submissions"],
    queryFn: getMySubmissions,
  });
}
