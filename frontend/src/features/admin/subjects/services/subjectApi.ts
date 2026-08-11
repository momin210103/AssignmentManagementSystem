import { api } from "@/api/axios";

export interface Subject {
  id: string;
  name: string;
}

export const getSubjects = async (): Promise<Subject[]> => {
  const response = await api.get("/admin/subjects/getall");

  return response.data;
};

//Create a new subject
export interface createSubject {
  name: string;
}
export const createSubject = async (data: createSubject): Promise<Subject> => {
  const response = await api.post("/admin/subjects/createsubject", data);
  return response.data;
}
