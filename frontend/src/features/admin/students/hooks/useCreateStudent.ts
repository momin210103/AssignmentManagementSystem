import { useMutation } from "@tanstack/react-query";

import { createStudent } from "../services/studentApi";

export const useCreateStudent = () => {
  return useMutation({
    mutationFn: createStudent,
  });
};
