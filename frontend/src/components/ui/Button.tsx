import type { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "./Spinner";
import { theme } from "@/constants/theme";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: ButtonVariant;
};

export default function Button({
  children,
  loading = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const getStyle = () => {
    switch (variant) {
      case "secondary":
        return {
          background: "#F1F5F9",
          color: theme.colors.textPrimary,
        };

      case "danger":
        return {
          background: theme.colors.danger,
          color: "#fff",
        };

      default:
        return {
          background: `linear-gradient(180deg,
            ${theme.colors.primaryLight} 0%,
            ${theme.colors.primary} 100%)`,
          color: "#fff",
        };
    }
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={[
        "flex h-12 items-center justify-center gap-2",
        "rounded-full px-6",
        "font-semibold",
        "transition-all duration-200",
        "hover:-translate-y-[1px]",
        "active:translate-y-0",
        "disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      style={{
        ...getStyle(),
        boxShadow: theme.shadow.button,
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}