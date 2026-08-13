import { BookOpen, ClipboardList, GraduationCap} from "lucide-react";
import { useMemo } from "react";

import Card from "@/components/ui/Card";

import { useTeacherAssignmentOptions } from "@/features/teacher/assignments/hooks/useTeacherAssignmentOptions";
import { useTeacherAssignments } from "@/features/teacher/assignments/hooks/useTeacherAssignment";

export default function TeacherDashboard() {
  const {
    data: assignmentOptions = [],
    isLoading: isOptionsLoading,
    isError: isOptionsError,
  } = useTeacherAssignmentOptions();

  const { data: assignments = [], isLoading: isAssignmentsLoading } =
    useTeacherAssignments();

  // Draft and Published assignments
  const draftAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.status === "Draft"),
    [assignments],
  );

  const publishedAssignments = useMemo(
    () => assignments.filter((assignment) => assignment.status === "Published"),
    [assignments],
  );

  /*
   * Unique classes
   */
  const classCount = useMemo(() => {
    return new Set(assignmentOptions.map((item) => item.classId)).size;
  }, [assignmentOptions]);

  /*
   * Unique subjects
   */
  const subjectCount = useMemo(() => {
    return new Set(assignmentOptions.map((item) => item.subjectId)).size;
  }, [assignmentOptions]);

  const stats = [
    {
      title: "My Classes",
      value: isOptionsLoading ? "..." : classCount,
      icon: GraduationCap,
    },
    {
      title: "My Subjects",
      value: isOptionsLoading ? "..." : subjectCount,
      icon: BookOpen,
    },
    {
      title: "My Assignments",
      value: isAssignmentsLoading ? "..." : assignments.length,
      icon: ClipboardList,
    },

  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">
          Teacher Dashboard
        </h1>

        <p className="mt-1 text-text-secondary">
          Manage your classes, subjects, assignments, and submissions.
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

      {/* Assigned Classes & Subjects */}
      <Card>
        <div className="border-b border-border p-5">
          <h2 className="text-lg font-semibold text-text-primary">
            My Assigned Classes & Subjects
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Classes and subjects assigned to you by the administrator.
          </p>
        </div>

        <div className="p-5">
          {isOptionsLoading && (
            <p className="py-8 text-center text-text-muted">
              Loading assigned classes and subjects...
            </p>
          )}

          {isOptionsError && (
            <p className="py-8 text-center text-danger">
              Failed to load assigned classes and subjects.
            </p>
          )}

          {!isOptionsLoading &&
            !isOptionsError &&
            assignmentOptions.length === 0 && (
              <p className="py-8 text-center text-text-muted">
                No classes or subjects assigned yet.
              </p>
            )}

          {!isOptionsLoading &&
            !isOptionsError &&
            assignmentOptions.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">
                        #
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">
                        Class
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-semibold text-text-secondary">
                        Subject
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {assignmentOptions.map((item, index) => (
                      <tr
                        key={`${item.classId}-${item.subjectId}`}
                        className="
                            border-b
                            border-border
                            last:border-0
                            hover:bg-background
                          "
                      >
                        <td className="px-4 py-3 text-sm text-text-muted">
                          {index + 1}
                        </td>

                        <td className="px-4 py-3 text-sm font-medium text-text-primary">
                          {item.className}
                        </td>

                        <td className="px-4 py-3 text-sm text-text-secondary">
                          {item.subjectName}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </div>
      </Card>

      {/* Draft & Published — side by side */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="border-b border-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Draft Assignments
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Assignments waiting to be published.
                </p>
              </div>

              <span className="rounded-full bg-warning/10 px-3 py-1 text-sm font-semibold text-warning">
                {draftAssignments.length}
              </span>
            </div>
          </div>

          <div className="p-5">
            {draftAssignments.length === 0 ? (
              <p className="py-6 text-center text-text-muted">
                No draft assignments.
              </p>
            ) : (
              <div className="space-y-3">
                {draftAssignments.slice(0, 5).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="rounded-xl border border-border p-4"
                  >
                    <h3 className="font-medium text-text-primary">
                      {assignment.title}
                    </h3>

                    <p className="mt-1 text-sm text-text-secondary">
                      Deadline:{" "}
                      {new Date(assignment.deadline).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card>
          <div className="border-b border-border p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  Published Assignments
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Assignments currently available to students.
                </p>
              </div>

              <span className="rounded-full bg-success/10 px-3 py-1 text-sm font-semibold text-success">
                {publishedAssignments.length}
              </span>
            </div>
          </div>

          <div className="p-5">
            {publishedAssignments.length === 0 ? (
              <p className="py-6 text-center text-text-muted">
                No published assignments.
              </p>
            ) : (
              <div className="space-y-3">
                {publishedAssignments.slice(0, 5).map((assignment) => (
                  <div
                    key={assignment.id}
                    className="rounded-xl border border-border p-4"
                  >
                    <h3 className="font-medium text-text-primary">
                      {assignment.title}
                    </h3>

                    <p className="mt-1 text-sm text-text-secondary">
                      Deadline:{" "}
                      {new Date(assignment.deadline).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
