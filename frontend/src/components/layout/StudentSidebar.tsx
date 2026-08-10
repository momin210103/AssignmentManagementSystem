import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { theme } from "@/constants/theme";

const menus = [
  {
    title: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Classes",
    path: "/student/classes",
    icon: GraduationCap,
  },
  {
    title: "My Subjects",
    path: "/student/subjects",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    path: "/student/assignments",
    icon: ClipboardList,
  },
];

export default function StudentSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile menu trigger — fixed, doesn't affect layout flow */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full shadow-md lg:hidden"
        style={{
          background: theme.colors.surface,
          color: theme.colors.textSecondary,
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
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
                Student Portal
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
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
                onClick={() => setIsOpen(false)}
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
                {user?.fullName ?? "Student"}
              </h4>

              <p
                className="text-xs"
                style={{
                  color: theme.colors.textMuted,
                }}
              >
                {user?.role ?? "Student"}
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
    </>
  );
}
