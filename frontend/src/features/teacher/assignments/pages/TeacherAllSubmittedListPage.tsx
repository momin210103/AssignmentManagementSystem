import { ClipboardList, Eye, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useGetAllSubmitted } from "@/features/teacher/assignments/hooks/useGetAllSubmitted";

export default function TeacherSubmissionsPage() {
  const navigate = useNavigate();

  const {
    data: submissions = [],
    isLoading,
    isError,
  } = useGetAllSubmitted();

  if (isLoading) {
    return (
      <Card>
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-text-muted">Loading submissions...</p>
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="flex min-h-[300px] flex-col items-center justify-center p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger/10 text-danger">
            <FileText size={24} />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-text-primary">
            Failed to load submissions
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            Something went wrong while loading submissions.
          </p>
        </div>
      </Card>
    );
  }

  const reviewedCount = submissions.filter(
    (submission) => submission.status === "Reviewed",
  ).length;

  const pendingCount = submissions.length - reviewedCount;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ClipboardList size={22} />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Student Submissions
            </h1>

            <p className="mt-1 text-sm text-text-secondary sm:text-base">
              View and review submissions from your students.
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        <Card className="p-4 sm:p-5">
          <p className="text-xs font-medium text-text-secondary sm:text-sm">
            Total Submissions
          </p>

          <p className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
            {submissions.length}
          </p>
        </Card>

        <Card className="p-4 sm:p-5">
          <p className="text-xs font-medium text-text-secondary sm:text-sm">
            Reviewed
          </p>

          <p className="mt-2 text-2xl font-bold text-success sm:text-3xl">
            {reviewedCount}
          </p>
        </Card>

        <Card className="col-span-2 p-4 sm:col-span-1 sm:p-5">
          <p className="text-xs font-medium text-text-secondary sm:text-sm">
            Pending Review
          </p>

          <p className="mt-2 text-2xl font-bold text-warning sm:text-3xl">
            {pendingCount}
          </p>
        </Card>
      </div>

      {/* Desktop Table */}
      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  #
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Student
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Assignment
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Submitted
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Marks
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission, index) => (
                <tr
                  key={submission.id}
                  className="border-b border-border last:border-b-0 hover:bg-background"
                >
                  <td className="px-5 py-4 text-sm text-text-muted">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-text-primary">
                      {submission.studentName}
                    </p>
                  </td>

                  <td className="max-w-[220px] px-5 py-4">
                    <p className="truncate text-sm text-text-primary">
                      {submission.assignmentTitle ?? "Untitled Assignment"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-text-primary">
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>

                    <p className="mt-0.5 text-xs text-text-muted">
                      {new Date(submission.submittedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <SubmissionStatus status={submission.status} />
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span className="font-semibold text-text-primary">
                      {submission.marks ?? "—"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Button
                      type="button"
                      size="sm"
                      leftIcon={<Eye size={16} />}
                      onClick={() =>
                        navigate(
                          `/teacher/submissions/${submission.id}/review`,
                          {
                            state: {
                              submission,
                            },
                          },
                        )
                      }
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}

              {submissions.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <EmptyState />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {submissions.length === 0 ? (
          <Card className="p-6">
            <EmptyState />
          </Card>
        ) : (
          submissions.map((submission, index) => (
            <Card key={submission.id} className="overflow-hidden">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 border-b border-border p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-text-primary">
                      {submission.studentName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-text-secondary">
                      {submission.assignmentTitle ?? "Untitled Assignment"}
                    </p>
                  </div>
                </div>

                <SubmissionStatus status={submission.status} />
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-xs text-text-secondary">Submitted</p>

                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-text-muted">
                    {new Date(submission.submittedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-text-secondary">Marks</p>

                  <p className="mt-1 text-lg font-bold text-text-primary">
                    {submission.marks ?? "—"}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="border-t border-border p-4">
                <Button
                  type="button"
                  size="sm"
                  leftIcon={<Eye size={16} />}
                  className="w-full"
                  onClick={() =>
                    navigate(`/teacher/submissions/${submission.id}/review`, {
                      state: {
                        submission,
                      },
                    })
                  }
                >
                  Review Submission
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

function SubmissionStatus({ status }: { status: string }) {
  const isReviewed = status === "Reviewed";

  return (
    <span
      className={`
        inline-flex rounded-full px-3 py-1
        text-xs font-semibold
        ${
          isReviewed
            ? "bg-success/10 text-success"
            : "bg-warning/10 text-warning"
        }
      `}
    >
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <FileText size={24} />
      </div>

      <h3 className="mt-3 text-base font-semibold text-text-primary">
        No submissions yet
      </h3>

      <p className="mt-1 text-sm text-text-secondary">
        Students haven't submitted any assignments yet.
      </p>
    </div>
  );
}
