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

// Get

export const getTeachers = async (): Promise<Teacher[]> => {
  const response = await api.get("/admin/users/teachers");

  return response.data;
};

// Put

export type UpdateTeacherRequest = {
  fullName: string;
  email: string;
  // phoneNumber: string | null;
};

export const updateTeacher = async (
  id: string,
  data: UpdateTeacherRequest,
): Promise<void> => {
  await api.put(`/admin/teachers/${id}`, data);
};

// Delete

export const deleteTeacher = async (id: string): Promise<void> => {
  await api.delete(`/admin/teachers/${id}`);
};
