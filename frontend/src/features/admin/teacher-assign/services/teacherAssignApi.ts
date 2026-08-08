import {api} from "@/api/axios";

export interface TeacherAssign {
  id: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
}
export const getTeacherAssigns = async (): Promise<TeacherAssign[]> => {
  const response = await api.get("/admin/teacher-assign");
  return response.data;
}