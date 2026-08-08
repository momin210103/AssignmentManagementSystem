import { useQuery } from "@tanstack/react-query";

import { getStudents } from "../services/studentApi";

export const useStudents = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });
};
