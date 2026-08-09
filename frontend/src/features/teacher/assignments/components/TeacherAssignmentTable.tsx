import Card from "@/components/ui/Card";

import { useTeacherAssignments } from "@/features/teacher/assignments/hooks/useTeacherAssignment";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AssignmentTable() {
  const {
    data: assignments = [],
    isLoading,
    isError,
  } = useTeacherAssignments();

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-text-secondary">
          Loading assignments...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-center text-danger">Failed to load assignments.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
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
              <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment, index) => (
              <tr
                key={assignment.id}
                className="border-b border-border hover:bg-background"
              >
                <td className="px-6 py-4 text-text-muted">{index + 1}</td>

                <td className="px-6 py-4 font-medium text-text-primary">
                  {assignment.title}
                </td>

                <td className="max-w-xs px-6 py-4 text-text-secondary">
                  <p className="truncate">{assignment.description}</p>
                </td>

                <td className="px-6 py-4 text-center text-text-secondary">
                  {assignment.maximumMarks}
                </td>

                <td className="px-6 py-4 text-text-secondary">
                  {new Date(assignment.deadline).toLocaleDateString()}
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
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/teacher/assignments/${assignment.id}/edit`)
                    }
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition hover:bg-primary/10 hover:text-primary"
                    title="Edit assignment"
                  >
                    <Edit size={17} />
                  </button>
                </td>
              </tr>
            ))}

            {assignments.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-text-muted">
                  No assignments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
