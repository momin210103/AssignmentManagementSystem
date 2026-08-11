import { BookOpen, ClipboardList, GraduationCap, Upload } from "lucide-react";

import Card from "@/components/ui/Card";

import { useStudentAssignments } from "@/features/student/assignments/hooks/useStudentAssignment";
import { useMySubmissions } from "@/features/student/submissions/hooks/useMySubmissions";
import { useMyProfile } from "@/features/profile/hooks/useMyProfile";

export default function StudentDashboard() {
  const { data: assignments = [], isLoading: assignmentsLoading } =
    useStudentAssignments();

  const { data: submissions = [], isLoading: submissionsLoading } =
    useMySubmissions();

  const recentAssignments = [...assignments]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);
  const currentTime = new Date().getTime();

  const submittedAssignmentIds = new Set(
    submissions.map((submission) => submission.assignmentId),
  );

  const { data: profile, isLoading: profileLoading } = useMyProfile();

  const upcomingAssignments = [...assignments]
    .filter(
      (assignment) =>
        !submittedAssignmentIds.has(assignment.id) &&
        new Date(assignment.deadline).getTime() >= currentTime,
    )
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    )
    .slice(0, 5);

  const stats = [
    {
      title: "My Classes",
      value: profileLoading
        ? "..."
        : profile?.class
          ? `${profile.class.name} - ${profile.class.section}`
          : "Not assigned",
      icon: GraduationCap,
    },
    {
      title: "My Subjects",
      value: profileLoading ? "..." : (profile?.subjects.length ?? 0),
      icon: BookOpen,
    },
    {
      title: "Assignments",
      value: assignmentsLoading ? "..." : assignments.length,
      icon: ClipboardList,
    },
    {
      title: "Submissions",
      value: submissionsLoading ? "..." : submissions.length,
      icon: Upload,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
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

                  <h2 className="mt-2 text-1xl  text-text-primary">
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

      {/* My Subjects */}
      <Card>
        <div className="border-b border-border p-5">
          <h2 className="text-lg font-semibold text-text-primary">
            My Subjects
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Subjects assigned to your class.
          </p>
        </div>

        <div className="p-5">
          {profileLoading ? (
            <p className="py-6 text-center text-text-muted">
              Loading subjects...
            </p>
          ) : profile?.subjects.length === 0 ? (
            <p className="py-6 text-center text-text-muted">
              No subjects assigned.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {profile?.subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="
              flex items-center gap-3 rounded-xl border border-border
              p-3.5 transition hover:border-primary hover:bg-primary/5
            "
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen size={18} />
                  </div>

                  <p className="truncate text-sm font-medium text-text-primary">
                    {subject.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

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
            {assignmentsLoading ? (
              <p className="py-8 text-center text-text-muted">
                Loading assignments...
              </p>
            ) : recentAssignments.length === 0 ? (
              <p className="py-8 text-center text-text-muted">
                No recent assignments.
              </p>
            ) : (
              <div className="space-y-3">
                {recentAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="
            flex items-center justify-between gap-4
            rounded-xl border border-border
            p-4
            transition
            hover:border-primary/30
            hover:bg-primary/5
          "
                  >
                    <div className="min-w-0">
                      <h3 className="truncate font-medium text-text-primary">
                        {assignment.title}
                      </h3>

                      {/* <p className="mt-1 text-xs text-text-secondary">
                        {assignment.subjectName}
                      </p> */}
                    </div>

                    <span
                      className="
              shrink-0 rounded-full
              bg-success/10 px-3 py-1
              text-xs font-semibold text-success
            "
                    >
                      {assignment.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <div className="p-5">
            {assignmentsLoading ? (
              <p className="py-8 text-center text-text-muted">
                Loading deadlines...
              </p>
            ) : upcomingAssignments.length === 0 ? (
              <p className="py-8 text-center text-text-muted">
                No upcoming deadlines.
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => {
                  const deadline = new Date(assignment.deadline);

                  return (
                    <div
                      key={assignment.id}
                      className="
              flex items-center justify-between gap-4
              rounded-xl border border-border
              p-4
              transition
              hover:border-primary/30
              hover:bg-primary/5
            "
                    >
                      <div className="min-w-0">
                        <h3 className="truncate font-medium text-text-primary">
                          {assignment.title}
                        </h3>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-xs font-medium text-warning">Due</p>

                        <p className="mt-1 text-sm font-semibold text-text-primary">
                          {deadline.toLocaleDateString()}
                        </p>

                        <p className="text-xs text-text-secondary">
                          {deadline.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
