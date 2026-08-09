import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useAuth } from "@/hooks/useAuth";
import TeacherSidebar from "@/components/layout/TeacherSidebar";

export default function DashboardLayout() {

  const {user} = useAuth();
  const renderSidebar = () => {
    switch (user?.role){
      case "Admin":
        return <Sidebar />;
      case "Teacher":
        return <TeacherSidebar />;
      default:
        return null;  
    }
  };


  return (
    <div className="flex min-h-screen bg-slate-100">
      {renderSidebar()}

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
