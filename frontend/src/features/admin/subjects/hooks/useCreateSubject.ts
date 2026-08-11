import { useMutation } from "@tanstack/react-query";
import { createSubject } from "../services/subjectApi";

export const useCreateSubject = () => {
  return useMutation({
    mutationFn: createSubject,
  });
};
