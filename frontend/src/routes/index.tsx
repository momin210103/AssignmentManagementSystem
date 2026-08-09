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
        path: "teachers",
        element: <TeacherListPage />,
      },
      {
        path: "teacher-assign",
        element: <TeacherAssignListPage />,
      },
      {
        path: "subjects",
        element: <SubjectListPage />,
      },
      {
        path: "assignments",
        element: <AssignmentListPage />,
      },
      {},
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
        path: "assignments/:assignmentId/submissions",
        element: <TeacherAssignmentSubmissionsPage />,
      },
      {
        path: "submissions/:submissionId/review",
        element: <SubmissionReviewPage />,
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
    ],
  },
]);
