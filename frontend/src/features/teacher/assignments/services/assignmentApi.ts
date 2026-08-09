import { api } from "@/api/axios";

import type { CreateAssignmentRequest, TeacherAssignment, TeacherAssignmentOption } from "../types/assignment";

export async function getTeacherAssignments() {
  const response = await api.get<TeacherAssignment[]>("assignments/teacher");

  return response.data;
}

// post

export async function createTeacherAssignment(
  data: CreateAssignmentRequest,
) {
  const response = await api.post<TeacherAssignment>(
    "/assignments",
    data,
  );

  return response.data;
}

// put
export async function getTeacherAssignmentOptions() {
  const response = await api.get<TeacherAssignmentOption[]>(
    "/teacher/assignments/options",
  );

  return response.data;
}