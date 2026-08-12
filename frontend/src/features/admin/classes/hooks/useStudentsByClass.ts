import { useQuery } from "@tanstack/react-query";

import { getStudentsByClass } from "../services/classApi";

export function useStudentsByClass(classId: string) {
  return useQuery({
    queryKey: ["class-students", classId],
    queryFn: () => getStudentsByClass(classId),
    enabled: !!classId,
  });
}
