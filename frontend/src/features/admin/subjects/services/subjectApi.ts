import { api } from "@/api/axios";

export interface Subject {
  id: string;
  name: string;
}

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await api.get("/admin/subjects/getall");

  return response.data;
};
