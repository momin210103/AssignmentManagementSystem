import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTeacher } from "../services/teacherApi";

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        fullName: string;
        email: string;
      };
    }) => updateTeacher(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachers"],
      });
    },
  });
};
