import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { publishAssignment } from "../services/assignmentApi";

export function usePublishAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishAssignment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teacher-assignments"],
      });
    },
  });
}