import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "@/components/layout/AdminSidebar";
import Topbar from "@/components/layout/Topbar";
import { useAuth } from "@/hooks/useAuth";
import TeacherSidebar from "@/components/layout/TeacherSidebar";
import StudentSidebar from "@/components/layout/StudentSidebar";

export default function DashboardLayout() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const renderSidebar = () => {
    const sidebarProps = {
      isOpen: isSidebarOpen,
      onClose: closeSidebar,
    };

    switch (user?.role) {
      case "Admin":
        return <AdminSidebar {...sidebarProps} />;
      case "Teacher":
        return <TeacherSidebar {...sidebarProps} />;
      case "Student":
        return <StudentSidebar {...sidebarProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="sticky top-0 h-screen shrink-0">{renderSidebar()}</div>

      <div className="flex min-h-screen flex-1 flex-col">
        <div className="sticky top-0 z-10">
          <Topbar isSidebarOpen={isSidebarOpen} onMenuClick={toggleSidebar} />
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
