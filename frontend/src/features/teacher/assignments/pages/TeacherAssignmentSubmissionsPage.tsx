import { ArrowLeft, Eye } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useAssignmentSubmissions } from "../hooks/useAssignmentSubmissions";

export default function TeacherAssignmentSubmissionsPage() {
  const navigate = useNavigate();

  const { assignmentId } = useParams<{
    assignmentId: string;
  }>();

  const {
    data: submissions = [],
    isLoading,
    isError,
  } = useAssignmentSubmissions(assignmentId ?? "");

  if (isLoading) {
    return (
      <Card>
        <p className="py-10 text-center text-text-muted">
          Loading submissions...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <p className="py-10 text-center text-danger">
          Failed to load submissions.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Student Submissions
          </h1>

          <p className="mt-1 text-text-secondary">
            Review submissions for this assignment.
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate("/teacher/assignments")}
        >
          Back to Assignments
        </Button>
      </div>

      {/* Submissions */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                  #
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                  Submitted At
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                  Marks
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission, index) => (
                <tr
                  key={submission.id}
                  className="
                      border-b
                      border-border
                      hover:bg-background
                    "
                >
                  <td className="px-6 py-4 text-text-muted">{index + 1}</td>

                  <td className="px-6 py-4 font-medium text-text-primary">
                    {submission.studentId}
                  </td>

                  <td className="px-6 py-4 text-text-secondary">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className="
                          rounded-full
                          bg-primary/10
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-primary
                        "
                    >
                      {submission.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center text-text-secondary">
                    {submission.marks ?? "—"}
                  </td>

                  <td className="px-6 py-4 text-center">
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
                  <td
                    colSpan={6}
                    className="
                      py-12
                      text-center
                      text-text-muted
                    "
                  >
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
