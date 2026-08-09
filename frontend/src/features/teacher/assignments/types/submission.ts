export type SubmissionStatus = "Submitted" | "Reviewed";

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  answer: string;
  fileUrl: string | null;
  submittedAt: string;
  marks: number | null;
  feedback: string | null;
  status: SubmissionStatus;
  reviewedAt: string | null;
}
