import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useAuth } from "@/hooks/useAuth";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import StudentSidebar from "@/components/layout/StudentSidebar";

export default function DashboardLayout() {
  const { user } = useAuth();

  const renderSidebar = () => {
    switch (user?.role) {
      case "Admin":
        return <Sidebar />;
      case "Teacher":
        return <TeacherSidebar />;
      case "Student":
        return <StudentSidebar />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="sticky top-0 h-screen shrink-0">{renderSidebar()}</div>

      <div className="flex min-h-screen flex-1 flex-col">
        <div className="sticky top-0 z-10">
          <Topbar />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
