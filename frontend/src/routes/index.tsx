import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import LoginPage from "@/features/auth/pages/LoginPage";
import AdminDashboard from "@/features/admin/dashboard/pages/AdminDashboard";
import StudentListPage from "@/features/admin/students/pages/StudentListPage";
import TeacherListPage from "@/features/admin/teachers/pages/TeacherListPage";
import SubjectListPage from "@/features/admin/subjects/pages/SubjectListPage";


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
        path: "subjects",
        element: <SubjectListPage />,
      },
      {
      }
    ],
  },
]);
