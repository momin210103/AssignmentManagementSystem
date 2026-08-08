import { api } from "@/api/axios";

import type { Teacher } from "../types/teacher";

// Post

export type CreateTeacherRequest = {
  fullName: string;
  email: string;
  password: string;
};

export const createTeacher = async (data: CreateTeacherRequest): Promise<void> => {
  await api.post("/admin/teachers/create", data);
};


// export type Teacher = {
//   id: string;
//   fullName: string;
//   email: string;
// };

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get("/admin/users/teachers");

  return response.data;
};
