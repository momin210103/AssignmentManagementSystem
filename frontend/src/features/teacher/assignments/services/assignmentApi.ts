import { api } from "@/api/axios";

import type { TeacherAssignment } from "../types/assignment";

export async function getTeacherAssignments() {
  const response = await api.get<TeacherAssignment[]>("assignments/teacher");

  return response.data;
}
