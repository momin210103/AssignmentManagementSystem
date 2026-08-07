import { ArrowRight, BookOpen } from "lucide-react";

import Card from "@/components/ui/Card";

const assignments = [
  {
    id: 1,
    title: "Physics Assignment",
    subject: "Physics",
    dueDate: "12 Aug 2026",
    status: "Active",
  },
  {
    id: 2,
    title: "Accounting Worksheet",
    subject: "Accounting",
    dueDate: "15 Aug 2026",
    status: "Active",
  },
  {
    id: 3,
    title: "Chemistry Lab Report",
    subject: "Chemistry",
    dueDate: "20 Aug 2026",
    status: "Draft",
  },
];

export default function RecentAssignments() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Recent
          </p>

          <h2 className="mt-1 text-xl font-bold text-text-primary">
            Assignments
          </h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-primary">
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-border
              p-4
            "
          >
            <div className="flex items-center gap-4">
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
                <BookOpen size={18} />
              </div>

              <div>
                <h3 className="font-semibold text-text-primary">
                  {assignment.title}
                </h3>

                <p className="text-sm text-text-secondary">
                  {assignment.subject} • Due {assignment.dueDate}
                </p>
              </div>
            </div>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${
                  assignment.status === "Active"
                    ? "bg-success/10 text-success"
                    : "bg-warning/10 text-warning"
                }
              `}
            >
              {assignment.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
