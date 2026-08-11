import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";

import type { TeacherAssignment } from "../types/assignment";

type TeacherAssignmentTableProps = {
  assignments: TeacherAssignment[];
  isLoading: boolean;
  isError: boolean;
};

export default function TeacherAssignmentTable({
  assignments,
  isLoading,
  isError,
}: TeacherAssignmentTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card>
        <div className="py-10 text-center text-text-muted">
          Loading assignments...
        </div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="py-10 text-center text-danger">
          Failed to load assignments.
        </div>
      </Card>
    );
  }

  if (assignments.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center text-text-muted">
          No assignments found.
        </div>
      </Card>
    );
  }

  return (
    <>
      {/* Mobile / tablet — card list */}
      <div className="space-y-3 md:hidden">
        {assignments.map((assignment) => (
          <Card
            key={assignment.id}
            onClick={() =>
              navigate(`/teacher/assignments/${assignment.id}/details`)
            }
            className="cursor-pointer p-4 transition hover:border-primary"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="min-w-0 truncate font-medium text-text-primary">
                {assignment.title}
              </h3>

              <span
                className="
                  inline-flex shrink-0 rounded-full bg-primary/10
                  px-3 py-1 text-xs font-semibold text-primary
                "
              >
                {assignment.status}
              </span>
            </div>

            <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
              {assignment.description}
            </p>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-text-secondary">
              <span>
                Deadline:{" "}
                <span className="font-medium text-text-primary">
                  {new Date(assignment.deadline).toLocaleDateString()}
                </span>
              </span>

              <span>
                Marks:{" "}
                <span className="font-medium text-text-primary">
                  {assignment.maximumMarks}
                </span>
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop — table */}
      <Card className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                  #
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                  Description
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                  Marks
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                  Deadline
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((assignment, index) => (
                <tr
                  key={assignment.id}
                  onClick={() =>
                    navigate(`/teacher/assignments/${assignment.id}/details`)
                  }
                  className="
                    cursor-pointer
                    border-b
                    border-border
                    transition-colors
                    hover:bg-background
                  "
                >
                  {/* # */}
                  <td className="px-6 py-4 text-text-muted">{index + 1}</td>

                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-text-primary">
                    {assignment.title}
                  </td>

                  {/* Description */}
                  <td className="max-w-xs px-6 py-4 text-text-secondary">
                    <p className="truncate">{assignment.description}</p>
                  </td>

                  {/* Marks */}
                  <td className="px-6 py-4 text-center text-text-secondary">
                    {assignment.maximumMarks}
                  </td>

                  {/* Deadline */}
                  <td className="px-6 py-4 text-text-secondary">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-primary/10
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-primary
                      "
                    >
                      {assignment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}