import Card from "@/components/ui/Card";

import { useAssignments } from "../hooks/useAssignments";

type AssignmentTableProps = {
  search: string;
  teacherId: string;
  classId: string;
  subjectId: string;
  status: string;
};

export default function AssignmentTable({
  search,
  teacherId,
  classId,
  subjectId,
  status
}: AssignmentTableProps) {
  const { data: assignments = [], isLoading, isError } = useAssignments();

const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.teacherName.toLowerCase().includes(search.toLowerCase()) ||
      assignment.className.toLowerCase().includes(search.toLowerCase()) ||
      assignment.subjectName.toLowerCase().includes(search.toLowerCase());

    const matchesTeacher =
      teacherId === "" || assignment.teacherId === teacherId;

    const matchesClass = classId === "" || assignment.classId === classId;

    const matchesSubject = subjectId === "" || assignment.subjectId === subjectId;

    const matchesStatus = status === "" || assignment.status.toString() === status;

    return matchesSearch && matchesTeacher && matchesClass && matchesSubject && matchesStatus;
  });



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
                Teacher
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Class
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
                Subject
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
            {filteredAssignments.map((assignment, index) => (
              <tr
                key={assignment.id}
                className="border-b border-border hover:bg-background"
              >
                <td className="px-6 py-4 text-text-muted">{index + 1}</td>

                <td className="px-6 py-4 font-medium text-text-primary">
                  {assignment.title}
                </td>

                <td className="px-6 py-4 text-text-secondary">
                  {assignment.teacherName}
                </td>

                <td className="px-6 py-4 text-text-secondary">
                  {assignment.className}
                </td>

                <td className="px-6 py-4 text-text-secondary">
                  {assignment.subjectName}
                </td>

                <td className="px-6 py-4 text-text-secondary">
                  {new Date(assignment.deadline).toLocaleDateString()}
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
                          : assignment.status === 0
                            ? "bg-warning/10 text-warning"
                            : "bg-danger/10 text-danger"
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
                <td colSpan={7} className="py-10 text-center text-text-muted">
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
