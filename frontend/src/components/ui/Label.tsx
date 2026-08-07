import type { LabelHTMLAttributes, ReactNode } from "react";
import { theme } from "@/constants/theme";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
};

export default function Label({
  children,
  className = "",
  ...props
}: LabelProps) {
  return (
    <label
      {...props}
      className={`block text-sm font-semibold ${className}`}
      style={{
        color: theme.colors.textPrimary,
      }}
    >
      {children}
    </label>
  );
}