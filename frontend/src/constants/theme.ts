export const theme = {
  colors: {
    // Brand
    primary: "#2E6FD9",
    primaryHover: "#1E56B0",
    primaryLight: "#4A86E8",

    // Dark
    navy: "#16233F",

    // Background
    background: "#EAF4FB",
    backgroundSecondary: "#DCEAF6",
    surface: "#FFFFFF",

    // Text
    textPrimary: "#16233F",
    textSecondary: "#6B7280",
    textMuted: "#94A3B8",
    textWhite: "#FFFFFF",

    // Border
    border: "#D6E2F1",
    inputBorder: "#D9E2EF",

    // State
    success: "#16A34A",
    warning: "#F59E0B",
    danger: "#DC2626",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    full: "9999px",
  },

  shadow: {
    card: "0 10px 30px rgba(22,35,63,.08)",
    button: "0 8px 24px rgba(46,111,217,.25)",
  },

  font: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
} as const;
