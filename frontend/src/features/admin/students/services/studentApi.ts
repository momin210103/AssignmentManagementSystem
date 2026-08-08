import { api } from "@/api/axios";

export type CreateStudentRequest = {
  fullName: string;
  email: string;
  password: string;
  classId: string;
};
export type Student = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  classId: string;
  className: string;
  section: string;
};

export const createStudent = async (data: CreateStudentRequest) => {
  const response = await api.post("/admin/students/create", data);

  return response.data;
};

// GET
export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get("/admin/users/students");

  return response.data;
};

//PUT

export type UpdateStudentRequest = {
  fullName?: string;
  email?: string;
  classId?: string;
};
export const updateStudent = async (id: string, data: UpdateStudentRequest) => {
  const response = await api.put(`/admin/students/${id}`, data);

  return response.data;
};

// Delete
export type DeleteStudentRequest = {
  id: string;
};

export const deleteStudent = async (id: string) => {
  const response = await api.delete(`/admin/students/${id}`);

  return response.data;
};
