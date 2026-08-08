import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteTeacherAssign } from "../services/teacherAssignApi";

export const useDeleteTeacherAssign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeacherAssign,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teacherAssignments"],
      });
    },
  });
};