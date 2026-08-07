import { useQuery } from "@tanstack/react-query";

import { getClasses } from "../services/classApi";

export const useClasses = () =>
  useQuery({
    queryKey: ["classes"],
    queryFn: getClasses,
  });
