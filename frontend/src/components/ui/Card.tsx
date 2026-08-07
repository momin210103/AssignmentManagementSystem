import type { HTMLAttributes, ReactNode } from "react";
import { theme } from "@/constants/theme";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={[
        "rounded-[28px]",
        "bg-white",
        "p-8",
        "transition-all duration-300",
        className,
      ].join(" ")}
      style={{
        background: theme.colors.surface,
        boxShadow:
          "0 24px 60px rgba(22,35,63,.10), 0 8px 24px rgba(22,35,63,.06)",
      }}
    >
      {children}
    </div>
  );
}
