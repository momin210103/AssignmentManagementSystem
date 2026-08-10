import { ClipboardList, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import { useStudentAssignments } from "@/features/student/assignments/hooks/useStudentAssignment";

export default function StudentAssignmentListPage() {
  const navigate = useNavigate();

  const {
    data: assignments = [],
    isLoading,
    isError,
  } = useStudentAssignments();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Assignments</h1>

          <p className="mt-1 text-text-secondary">
            View assignments assigned to your class.
          </p>
        </div>

        <Card>
          <p className="py-10 text-center text-text-muted">
            Loading assignments...
          </p>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Assignments</h1>
        </div>

        <Card>
          <p className="py-10 text-center text-danger">
            Failed to load assignments.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Assignments</h1>

        <p className="mt-1 text-text-secondary">
          View assignments assigned to your class.
        </p>
      </div>

      {/* Empty State */}
      {assignments.length === 0 && (
        <Card>
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
              <ClipboardList size={28} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-text-primary">
              No assignments available
            </h2>

            <p className="mt-1 text-sm text-text-secondary">
              There are no published assignments for your class yet.
            </p>
          </div>
        </Card>
      )}

      {/* Assignment List */}
      {assignments.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="flex flex-col p-5">
              {/* Title */}
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
                  <ClipboardList size={21} />
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
                  Published
                </span>
              </div>

              <h2 className="mt-4 line-clamp-2 text-lg font-semibold text-text-primary">
                {assignment.title}
              </h2>

              <p className="mt-2 line-clamp-3 text-sm leading-6 text-text-secondary">
                {assignment.description || "No description available."}
              </p>

              {/* Information */}
              <div className="mt-5 space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Maximum Marks</span>

                  <span className="font-semibold text-text-primary">
                    {assignment.maximumMarks}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-text-muted" />

                  <span className="text-text-secondary">Deadline</span>

                  <span className="ml-auto font-medium text-text-primary">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-5">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() =>
                    navigate(`/student/assignments/${assignment.id}/details`)
                  }
                >
                  View Assignment
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
