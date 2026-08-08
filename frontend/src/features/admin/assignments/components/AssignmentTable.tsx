import Card from "@/components/ui/Card";

import { useAssignment } from "../hooks/useAssignment";

type AssignmentTableProps = {
  search: string;
};

export default function AssignmentTable({ search }: AssignmentTableProps) {
  const { data: assignments = [], isLoading, isError } = useAssignment();

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.description.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "Draft";

      case 1:
        return "Published";

      case 2:
        return "Closed";

      default:
        return "Unknown";
    }
  };

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

              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Deadline
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                Marks
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAssignments.map((assignment, index) => (
              <tr
                key={assignment.id}
                className="border-b border-border hover:bg-background"
              >
                <td className="px-6 py-4 text-text-muted">{index + 1}</td>

                <td className="px-6 py-4 font-medium text-text-primary">
                  {assignment.title}
                </td>

                <td className="max-w-xs px-6 py-4 text-text-secondary">
                  {assignment.description}
                </td>

                <td className="px-6 py-4 text-text-secondary">
                  {new Date(assignment.deadline).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-center text-text-secondary">
                  {assignment.maximumMarks}
                </td>

                <td className="px-6 py-4 text-center">
                  <span
                    className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                        ${
                          assignment.status === 1
                            ? "bg-success/10 text-success"
                            : "bg-warning/10 text-warning"
                        }
                    `}
                  >
                    {getStatusLabel(assignment.status)}
                  </span>
                </td>
              </tr>
            ))}

            {filteredAssignments.length === 0 && (
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
