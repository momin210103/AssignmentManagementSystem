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

export interface CreateTeacherAssignRequest {
  teacherId: string;
  classId: string;
  subjectId: string;
}

// Post
export const createTeacherAssign = async (data: CreateTeacherAssignRequest): Promise<TeacherAssign> => {
  const response = await api.post("/admin/teacher-assign", data);
  return response.data;
}
// Get all teacher assign
export const getTeacherAssigns = async (): Promise<TeacherAssign[]> => {
  const response = await api.get("/admin/teacher-assign");
  return response.data;
}

// Delete
export const deleteTeacherAssign = async (id: string): Promise<void> => {
  await api.delete(`/admin/teacher-assign/${id}`);
}