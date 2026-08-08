import { useQuery } from "@tanstack/react-query";

import { getSubjects } from "@/features/admin/subjects/services/subjectApi";

export const useSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });
};
