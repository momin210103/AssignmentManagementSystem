import { api } from "@/api/axios";
import type { Assignment, AssignmentDetails } from "../types/assignment";

// GET Assignments
export const getAssignments = async (): Promise<Assignment[]> => {
  const response = await api.get("/admin/assignments");

  return response.data;
};

// Get Assignment by ID
export const getAssignmentById = async (
  id: string,
): Promise<AssignmentDetails> => {
  const response = await api.get(`/assignments/${id}`);

  return response.data;
};
