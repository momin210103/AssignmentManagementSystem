import { useMutation } from "@tanstack/react-query";
import { createTeacherAssignment } from "../services/assignmentApi";

export function useCreateAssignment() {
  return useMutation({
    mutationFn: createTeacherAssignment,
  });
}
