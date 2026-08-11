import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubject } from "../services/subjectApi";



export function useDeleteSubject() {
    const queryClient = useQueryClient();
    const deleteSubjectMutation = useMutation({
    mutationFn: (id: string) => deleteSubject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });

  return deleteSubjectMutation;
}