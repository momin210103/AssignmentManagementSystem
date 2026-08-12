import { api } from "@/api/axios";

export interface AdminSubmission {
  id: string;
  studentId: string;
  studentName: string;
  assignmentTitle: string;
  subjectName: string;
  className: string;
  marks: number | null;
  submittedAt: string;
  status: 0 | 1 | 2; // 0: Submitted,, 1: Reviewed, 2: Late
}

export const getAllSubmissions = async (): Promise<AdminSubmission[]> => {
  const response = await api.get("/admin/submissions/all");

  return response.data;
};
