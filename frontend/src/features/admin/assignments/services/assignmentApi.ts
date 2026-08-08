import { api } from "@/api/axios";

export interface Assignment {
  id: string;
  title: string;
  teacherName: string;
  teacherId: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  status: number;
  deadline: string;
}

export const getAssignments = async (): Promise<Assignment[]> => {
  const response = await api.get("/admin/assignments");

  return response.data;
};
