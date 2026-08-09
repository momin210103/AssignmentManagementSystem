import { BookOpen, ClipboardList, GraduationCap, Upload } from "lucide-react";

import Card from "@/components/ui/Card";

const stats = [
  {
    title: "My Classes",
    value: "-",
    icon: GraduationCap,
  },
  {
    title: "My Subjects",
    value: "-",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    value: "-",
    icon: ClipboardList,
  },
  {
    title: "Submissions",
    value: "-",
    icon: Upload,
  },
];

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">
          Student Dashboard
        </h1>

        <p className="mt-1 text-text-secondary">
          View your classes, subjects, assignments, and submissions.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-text-primary">
                    {stat.value}
                  </h2>
                </div>

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
                  <Icon size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Assignments */}
        <Card>
          <div className="border-b border-border p-5">
            <h2 className="text-lg font-semibold text-text-primary">
              Recent Assignments
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Recently published assignments.
            </p>
          </div>

          <div className="p-5">
            <p className="py-8 text-center text-text-muted">
              No recent assignments.
            </p>
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <div className="border-b border-border p-5">
            <h2 className="text-lg font-semibold text-text-primary">
              Upcoming Deadlines
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              Assignments that are due soon.
            </p>
          </div>

          <div className="p-5">
            <p className="py-8 text-center text-text-muted">
              No upcoming deadlines.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
