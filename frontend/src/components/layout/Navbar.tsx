import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { theme } from "@/constants/theme";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: theme.colors.primary }}
          >
            <GraduationCap size={20} color={theme.colors.textWhite} />
          </div>

          <div>
            <h1
              className="text-lg font-extrabold leading-tight"
              style={{
                color: theme.colors.textPrimary,
                fontFamily: theme.font.heading,
              }}
            >
              AMS
            </h1>

            <p
              className="text-xs leading-tight"
              style={{ color: theme.colors.textMuted }}
            >
              ONNOROKOM Assignment Management
            </p>
          </div>
        </Link>

        {/* Desktop links — disabled, display only */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <span
              key={link.href}
              aria-disabled="true"
              className="cursor-not-allowed select-none text-sm font-medium opacity-50"
              style={{ color: theme.colors.textSecondary }}
            >
              {link.label}
            </span>
          ))}
        </nav>

        {/* Desktop actions */}

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden"
          style={{
            borderColor: theme.colors.border,
            color: theme.colors.textSecondary,
          }}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden"
          style={{
            borderTop: `1px solid ${theme.colors.border}`,
            background: theme.colors.surface,
          }}
        >
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <span
                key={link.href}
                aria-disabled="true"
                className="cursor-not-allowed select-none rounded-xl px-3 py-2.5 text-sm font-medium opacity-50"
                style={{ color: theme.colors.textSecondary }}
              >
                {link.label}
              </span>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
