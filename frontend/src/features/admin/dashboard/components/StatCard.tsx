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
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-primary/10
            text-primary
          "
        >
          {icon}
        </div>

        {trend && (
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${
              trendType === "up"
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger"
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-3xl font-extrabold text-text-primary">{value}</h2>

        <p className="mt-1 text-sm text-text-secondary">{title}</p>
      </div>
    </Card>
  );
}
