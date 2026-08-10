export interface Assignment {
  id: string;
  title: string;
  teacherName: string;
  teacherId: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  status: number;
  deadline: string;
}

export interface AssignmentDetails {
  id: string;
  title: string;
  description: string | null;
  deadline: string;
  maximumMarks: number;
  status: string;
  createdAt: string;

  teacherId: string;
  teacherName: string;

  classId: string;
  className: string;
  section: string;

  subjectId: string;
  subjectName: string;
}
