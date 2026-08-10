import { ClipboardCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useMySubmissions } from "../hooks/useMySubmissions";

export default function StudentSubmissionListPage() {
  const navigate = useNavigate();

  const { data: submissions = [], isLoading, isError } = useMySubmissions();

  if (isLoading) {
    return (
      <div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            My Submissions
          </h1>

          <p className="mt-1 text-text-secondary">
            View all your assignment submissions.
          </p>
        </div>

        <Card className="mt-6">
          <p className="py-10 text-center text-text-muted">
            Loading submissions...
          </p>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            My Submissions
          </h1>

          <p className="mt-1 text-text-secondary">
            View all your assignment submissions.
          </p>
        </div>

        <Card className="mt-6">
          <p className="py-10 text-center text-danger">
            Failed to load submissions.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">My Submissions</h1>

        <p className="mt-1 text-text-secondary">
          View all your assignment submissions.
        </p>
      </div>

      {/* Empty State */}
      {submissions.length === 0 && (
        <Card className="mt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-primary
              "
            >
              <ClipboardCheck size={28} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-text-primary">
              No submissions yet
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              You have not submitted any assignments yet.
            </p>
          </div>
        </Card>
      )}

      {/* Submission List */}
      {submissions.length > 0 && (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {submissions.map((submission) => (
            <Card key={submission.id} className="flex flex-col p-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary/10
                    text-primary
                  "
                >
                  <ClipboardCheck size={21} />
                </div>

                <span
                  className="
                    rounded-full
                    bg-success/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-success
                  "
                >
                  {submission.status}
                </span>
              </div>

              {/* Submission ID */}
              <h2 className="mt-4 text-sm font-semibold text-text-primary">
                Submission
              </h2>
              <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-text-primary">
                {submission.assignmentTitle}
              </h2>

              {/* Information */}
              <div className="mt-5 space-y-3 border-t border-border pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-text-muted" />

                  <span className="text-text-secondary">Submitted At</span>

                  <span className="ml-auto font-medium text-text-primary">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Marks</span>

                  <span className="font-semibold text-text-primary">
                    {submission.marks ?? "Not graded"}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() =>
                    navigate(`/student/submissions/${submission.id}/details`)
                  }
                >
                  View Submission
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
