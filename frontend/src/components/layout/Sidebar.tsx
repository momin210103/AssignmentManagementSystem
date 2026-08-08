import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { theme } from "@/constants/theme";

const menus = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    path: "/admin/students",
    icon: Users,
  },
  {
    title: "Teachers",
    path: "/admin/teachers",
    icon: GraduationCap,
  },
  {
    title: "Teacher Assign",
    path: "/admin/teacher-assign",
    icon: ClipboardList,
  },
  {
    title: "Subjects",
    path: "/admin/subjects",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    path: "/admin/assignments",
    icon: ClipboardList,
  },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className="flex h-screen w-72 flex-col"
      style={{
        background: theme.colors.surface,
        borderRight: `1px solid ${theme.colors.border}`,
      }}
    >
      {/* Logo */}
      <div
        className="px-6 py-7"
        style={{
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full"
            style={{
              background: theme.colors.primary,
            }}
          >
            <GraduationCap color="white" size={20} />
          </div>

          <div>
            <h1
              className="text-lg font-extrabold"
              style={{
                color: theme.colors.textPrimary,
                fontFamily: theme.font.heading,
              }}
            >
              AMS
            </h1>

            <p
              className="text-xs"
              style={{
                color: theme.colors.textMuted,
              }}
            >
              Assignment Management
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-4">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive ? "text-white" : "hover:bg-[#EAF1FC]"
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive
                  ? theme.colors.primary
                  : "transparent",
                color: isActive
                  ? theme.colors.textWhite
                  : theme.colors.textSecondary,
              })}
            >
              <Icon size={20} />

              <span className="font-medium">{menu.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        className="p-4"
        style={{
          borderTop: `1px solid ${theme.colors.border}`,
        }}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full font-bold text-white"
            style={{
              background: theme.colors.primary,
            }}
          >
            {user?.fullName?.charAt(0) ?? "U"}
          </div>

          <div>
            <h4
              className="text-sm font-semibold"
              style={{
                color: theme.colors.textPrimary,
              }}
            >
              {user?.fullName}
            </h4>

            <p
              className="text-xs"
              style={{
                color: theme.colors.textMuted,
              }}
            >
              {user?.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 transition"
          style={{
            background: "#FCEAEA",
            color: theme.colors.danger,
          }}
        >
          <LogOut size={20} />

          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
