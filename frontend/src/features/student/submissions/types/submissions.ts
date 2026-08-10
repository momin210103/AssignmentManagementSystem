export type CreateSubmissionRequest = {
  assignmentId: string;
  answer: string;
  fileUrl: string | null;
};

export type ResubmitSubmissionRequest = {
  answer: string;
  fileUrl: string | null;
};
