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
    <Card className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-primary sm:text-xs">
            Recent
          </p>

          <h2 className="mt-1 text-lg font-bold text-text-primary sm:text-xl">
            Assignments
          </h2>
        </div>

        <button
          type="button"
          className="
            flex
            shrink-0
            items-center
            gap-1
            text-xs
            font-semibold
            text-primary
            transition
            hover:opacity-70
            sm:text-sm
          "
        >
          View All
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Assignment List */}
      <div className="space-y-3 sm:space-y-4">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="
              flex
              flex-col
              gap-3
              rounded-xl
              border
              border-border
              p-3
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-4
            "
          >
            {/* Assignment Info */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
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
                <BookOpen size={17} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-text-primary sm:text-base">
                  {assignment.title}
                </h3>

                <p className="mt-1 truncate text-xs text-text-secondary sm:text-sm">
                  {assignment.subject}
                  <span className="mx-1">•</span>
                  Due {assignment.dueDate}
                </p>
              </div>
            </div>

            {/* Status */}
            <span
              className={`
                w-fit
                rounded-full
                px-3
                py-1
                text-[11px]
                font-semibold
                sm:text-xs
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
