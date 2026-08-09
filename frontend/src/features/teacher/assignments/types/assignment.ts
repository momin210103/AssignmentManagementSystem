export interface TeacherAssignment {
  id: string;
  title: string;
  description: string;
  deadline: string;
  maximumMarks: number;
  status: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  createdAt: string;
}

export interface CreateAssignmentRequest {
  title: string;
  description: string;
  deadline: string;
  maximumMarks: number;
  classId: string;
  subjectId: string;
}

export interface TeacherAssignmentOption {
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
}

export interface UpdateAssignmentRequest {
  title: string;
  description: string;
  deadline: string;
  maximumMarks: number;
  classId: string;
  subjectId: string;
}
