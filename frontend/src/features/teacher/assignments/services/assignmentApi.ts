import { api } from "@/api/axios";

import type {
  CreateAssignmentRequest,
  TeacherAssignment,
  TeacherAssignmentOption,
  UpdateAssignmentRequest,
} from "../types/assignment";

export async function getTeacherAssignments() {
  const response = await api.get<TeacherAssignment[]>("assignments/teacher");

  return response.data;
}

// post

export async function createTeacherAssignment(data: CreateAssignmentRequest) {
  const response = await api.post<TeacherAssignment>("/assignments", data);

  return response.data;
}

// get
export async function getTeacherAssignmentOptions() {
  const response = await api.get<TeacherAssignmentOption[]>(
    "/teacher/assignments/options",
  );

  return response.data;
}

// Put
export async function updateTeacherAssignment(
  id: string,
  data: UpdateAssignmentRequest,
) {
  const response = await api.put<TeacherAssignment>(`/assignments/${id}`, data);

  return response.data;
}

// Get by Id
export async function getAssignmentById(id: string) {
  const response = await api.get<TeacherAssignment>(`/assignments/${id}`);

  return response.data;
}

// publish
export async function publishAssignment(id: string) {
  const response = await api.patch(`/assignments/${id}/publish`);

  return response.data;
}

export async function unpublishAssignment(id: string) {
  const response = await api.patch(`/assignments/${id}/unpublish`);

  return response.data;
}

// Delete
export async function deleteAssignment(id: string) {
  const response = await api.delete(`/assignments/${id}`);

  return response.data;
}

// Submitted Assignments
import type { AssignmentSubmission } from "../types/submission";

export async function getAssignmentSubmissions(assignmentId: string) {
  const response = await api.get<AssignmentSubmission[]>(
    `/assignments/${assignmentId}/submissions`,
  );

  return response.data;
}

// Grade Submission
export type GradeSubmissionRequest = {
  marks: number;
  feedback: string;
};

export async function gradeSubmission(
  submissionId: string,
  data: GradeSubmissionRequest,
) {
  const response = await api.patch<AssignmentSubmission>(
    `/submissions/${submissionId}/grade`,
    data,
  );

  return response.data;
}
