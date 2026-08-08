import { api } from "@/api/axios";

export type Teacher = {
  id: string;
  fullName: string;
  email: string;
};

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get("/admin/users/teachers");

  return response.data;
};
