import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Upload,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { theme } from "@/constants/theme";

const menus = [
  {
    title: "Dashboard",
    path: "/teacher/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Classes",
    path: "/teacher/classes",
    icon: GraduationCap,
  },
  {
    title: "My Subjects",
    path: "/teacher/subjects",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    path: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    title: "Submissions",
    path: "/teacher/submissions",
    icon: Upload,
  },
];

export default function TeacherSidebar() {
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
            <GraduationCap size={22} color={theme.colors.textWhite} />
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
              Teacher Portal
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
            {user?.fullName?.charAt(0).toUpperCase() ?? "U"}
          </div>

          <div className="min-w-0">
            <h4
              className="truncate text-sm font-semibold"
              style={{
                color: theme.colors.textPrimary,
              }}
            >
              {user?.fullName ?? "Teacher"}
            </h4>

            <p
              className="text-xs"
              style={{
                color: theme.colors.textMuted,
              }}
            >
              {user?.role ?? "Teacher"}
            </p>
          </div>
        </div>

        <button
          type="button"
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
