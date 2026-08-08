import { api } from "@/api/axios";

export interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  maximumMarks: number;
  status: number;
  teacherId: string;
  classId: string;
  subjectId: string;
  createdAt: string;
}

export const getAssignments = async (): Promise<Assignment[]> => {
  const response = await api.get("/admin/assignments");

  return response.data;
};
