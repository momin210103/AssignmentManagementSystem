import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Users,
  X,
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
  {
    title: "Submissions",
    path: "/admin/submissions",
    icon: ClipboardList,
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Overlay — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw] flex-col transition-transform duration-200 lg:static lg:max-w-none lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: theme.colors.surface,
          borderRight: `1px solid ${theme.colors.border}`,
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between px-6 py-7"
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

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg lg:hidden"
            style={{ color: theme.colors.textSecondary }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                onClick={onClose}
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
    </>
  );
}
