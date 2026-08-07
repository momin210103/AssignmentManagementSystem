import { TrendingUp } from "lucide-react";

import Card from "@/components/ui/Card";

export default function FloatingCard() {
  return (
    <Card
      className="
        absolute
        -right-4
        -top-5
        hidden
        w-64
        p-5
        lg:block
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            This Month
          </p>

          <h3 className="mt-2 text-3xl font-extrabold text-text-primary">
            96%
          </h3>

          <p className="mt-1 text-sm text-text-secondary">Active Students</p>
        </div>

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-success/10
            text-success
          "
        >
          <TrendingUp size={22} />
        </div>
      </div>

      <div className="mt-5">
        <div className="h-2 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-success"
            style={{ width: "96%" }}
          />
        </div>

        <p className="mt-2 text-xs text-text-muted">
          96% of students submitted assignments on time.
        </p>
      </div>
    </Card>
  );
}
