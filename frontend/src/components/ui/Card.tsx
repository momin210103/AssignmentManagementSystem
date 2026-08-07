import type { HTMLAttributes, ReactNode } from "react";

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
        "rounded-xl",
        "border border-border",
        "bg-surface",
        "shadow-card",
        "transition-all duration-300",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
