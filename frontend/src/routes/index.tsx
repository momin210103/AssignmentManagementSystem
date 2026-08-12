import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import LoginPage from "@/features/auth/pages/LoginPage";
import AdminDashboard from "@/features/admin/dashboard/pages/AdminDashboard";
import StudentListPage from "@/features/admin/students/pages/StudentListPage";
import TeacherListPage from "@/features/admin/teachers/pages/TeacherListPage";
import SubjectListPage from "@/features/admin/subjects/pages/SubjectListPage";
import TeacherAssignListPage from "@/features/admin/teacher-assign/pages/TeacherAssignListPage";
import AssignmentListPage from "@/features/admin/assignments/pages/AssignmentListPage";
import TeacherDashboard from "@/features/teacher/dashboard/pages/TeacherDashboard";
import StudentDashboard from "@/features/student/dashboard/pages/StudentDashboard";
import TeacherAssignmentListPage from "@/features/teacher/assignments/pages/TeacherAssignmentListPage";
import TeacherCreateAssignmentPage from "@/features/teacher/assignments/pages/TeacherCreateAssignmentPage";
import TeacherEditAssignmentPage from "@/features/teacher/assignments/pages/EditAssignmentPage";
import TeacherAssignmentSubmissionsPage from "@/features/teacher/assignments/pages/TeacherAssignmentSubmissionsPage";
import SubmissionReviewPage from "@/features/teacher/assignments/pages/SubmissionReviewPage";
import StudentAssignmentListPage from "@/features/student/assignments/pages/StudentAssignmentListPage";
import StudentAssignmentDetailsPage from "@/features/student/assignments/pages/StudentAssignmentDetailsPage";
import StudentAssignmentSubmissionPage from "@/features/student/assignments/pages/StudentAssignmentSubmissionPage";
import StudentSubmissionListPage from "@/features/student/submissions/pages/StudentSubmissionListPage";
import StudentSubmissionDetailsPage from "@/features/student/submissions/pages/StudentSubmissionDetailsPage";
import TeacherAssignmentDetailsPage from "@/features/teacher/assignments/pages/TeacherAssignmentDetailsPage";
import TeacherAllSubmittedListPage from "@/features/teacher/assignments/pages/TeacherAllSubmittedListPage";
import StudentDetailsPage from "@/features/admin/students/pages/StudentDetailsPage";
import TeacherDetailsPage from "@/features/admin/teachers/pages/TeacherDetailsPage";
import AdminAssignmentDetailsPage from "@/features/admin/assignments/pages/AdminAssignmentDetailsPage";
import AllSubmissionsListPage from "@/features/admin/submissions/pages/AllSubmissionsListPage";
import ClassListPage from "@/features/admin/classes/pages/ClassListPage";
import ClassDetailsPage from "@/features/admin/classes/pages/ClassDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "students",
        element: <StudentListPage />,
      },
      {
        path: "students/:studentId",
        element: <StudentDetailsPage />,
      },
      {
        path: "teachers",
        element: <TeacherListPage />,
      },
      {
        path: "teachers/:teacherId",
        element: <TeacherDetailsPage />,
      },
      {
        path: "teacher-assign",
        element: <TeacherAssignListPage />,
      },
      {
        path: "classes",
        element: <ClassListPage />,

      },
      {
        path: "classes/:classId",
        element: <ClassDetailsPage />,

      },
      {
        path: "subjects",
        element: <SubjectListPage />,
      },
      {
        path: "assignments",
        element: <AssignmentListPage />,
      },
      {
        path: "assignments/:assignmentId/details",
        element: <AdminAssignmentDetailsPage />,
      },
      {
        path: "submissions",
        element: <AllSubmissionsListPage/>
      }
    ],
  },
  {
    path: "/teacher",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "assignments",
        element: <TeacherAssignmentListPage />,
      },
      {
        path: "assignments/create",
        element: <TeacherCreateAssignmentPage />,
      },
      {
        path: "assignments/:id/edit",
        element: <TeacherEditAssignmentPage />,
      },
      {
        path: "assignments/:id/details",
        element: <TeacherAssignmentDetailsPage />,
      },
      {
        path: "assignments/:assignmentId/submissions",
        element: <TeacherAssignmentSubmissionsPage />,
      },
      {
        path: "submissions/:submissionId/review",
        element: <SubmissionReviewPage />,
      },
      {
        path: "submissions",
        element: <TeacherAllSubmittedListPage />,
      },
    ],
  },
  {
    path: "/student",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "assignments",
        element: <StudentAssignmentListPage />,
      },
      {
        path: "assignments/:id/details",
        element: <StudentAssignmentDetailsPage />,
      },
      {
        path: "assignments/:id/submit",
        element: <StudentAssignmentSubmissionPage />,
      },
      {
        path: "submissions",
        element: <StudentSubmissionListPage />,
      },
      {
        path: "submissions/:id/details",
        element: <StudentSubmissionDetailsPage />,
      },
    ],
  },
]);
