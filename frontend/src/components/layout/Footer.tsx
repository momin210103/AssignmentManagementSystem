import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { theme } from "@/constants/theme";

const footerLinks = {
  Product: [
    { label: "Features" },
    { label: "For Teachers" },
    { label: "For Students" },
    { label: "For Admins" },
  ],
  Company: [{ label: "About" }, { label: "Contact" }],
  Legal: [{ label: "Privacy Policy" }, { label: "Terms of Service" }],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: theme.colors.surface,
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ background: theme.colors.primary }}
              >
                <GraduationCap size={20} color={theme.colors.textWhite} />
              </div>

              <h2
                className="text-lg font-extrabold"
                style={{
                  color: theme.colors.textPrimary,
                  fontFamily: theme.font.heading,
                }}
              >
                AMS
              </h2>
            </Link>

            <p
              className="mt-4 max-w-xs text-sm leading-relaxed"
              style={{ color: theme.colors.textSecondary }}
            >
              A simple, role-based assignment management system for schools —
              built for admins, teachers, and students.
            </p>

            <div className="mt-5 space-y-2">
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                <Mail size={15} />
                momincse13@gmail.com
              </div>

              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                <Phone size={15} />
                +880 1982458419
              </div>

              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                <MapPin size={15} />
                Dhaka, Bangladesh
              </div>
            </div>
          </div>

          {/* Link columns — disabled, display only */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="text-sm font-semibold"
                style={{ color: theme.colors.textPrimary }}
              >
                {heading}
              </h3>

              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <span
                      aria-disabled="true"
                      className="cursor-not-allowed select-none text-sm opacity-50"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row"
          style={{ borderTop: `1px solid ${theme.colors.border}` }}
        >
          <p className="text-xs" style={{ color: theme.colors.textMuted }}>
            © {year} AMS — ONNOROKOM Assignment Management System. All rights reserved.
          </p>

          <p className="text-xs" style={{ color: theme.colors.textMuted }}>
            Built for schools, by educators.
          </p>
        </div>
      </div>
    </footer>
  );
}
