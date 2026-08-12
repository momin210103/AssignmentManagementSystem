import type { ReactNode } from "react";

import Card from "@/components/ui/Card";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendType?: "up" | "down";
};

export default function StatCard({
  title,
  value,
  icon,
  trend,
  trendType = "up",
}: StatCardProps) {
  return (
    <Card className="p-4 sm:p-6">
      {/* Top */}
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
            sm:h-12
            sm:w-12
          "
        >
          {icon}
        </div>

        {/* Trend */}
        {trend && (
          <span
            className={`
              shrink-0
              rounded-full
              px-2
              py-1
              text-[11px]
              font-semibold
              sm:text-xs
              ${
                trendType === "up"
                  ? "bg-success/10 text-success"
                  : "bg-danger/10 text-danger"
              }
            `}
          >
            {trend}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-4 sm:mt-6">
        <h2 className="text-2xl font-extrabold text-text-primary sm:text-3xl">
          {value}
        </h2>

        <p className="mt-1 text-xs text-text-secondary sm:text-sm">{title}</p>
      </div>
    </Card>
  );
}
