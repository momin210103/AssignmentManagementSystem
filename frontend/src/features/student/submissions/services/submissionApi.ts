import { api } from "@/api/axios";
import type { CreateSubmissionRequest } from "../types/submissions";
import type { AssignmentSubmission } from "@/features/teacher/assignments/types/submission";

export async function createSubmission(data: CreateSubmissionRequest) {
  const response = await api.post("/submissions", data);

  return response.data;
}

// Upload submission file
export async function uploadSubmissionFile(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<{ fileUrl: string }>(
    "/files/upload",
    formData,
  );

  return response.data;
}



export async function getMySubmissions() {
  const response = await api.get<AssignmentSubmission[]>("/submissions/my");

  return response.data;
}
