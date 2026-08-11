import Card from "@/components/ui/Card";
import { useNavigate } from "react-router-dom";

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
  status,
}: AssignmentTableProps) {
  const { data: assignments = [], isLoading, isError } = useAssignments();

  const navigate = useNavigate();

  const filteredAssignments = assignments.filter((assignment) => {
    const query = search.toLowerCase();

    const matchesSearch =
      assignment.title.toLowerCase().includes(query) ||
      assignment.teacherName.toLowerCase().includes(query) ||
      assignment.className.toLowerCase().includes(query) ||
      assignment.subjectName.toLowerCase().includes(query);

    const matchesTeacher =
      teacherId === "" || assignment.teacherId === teacherId;

    const matchesClass = classId === "" || assignment.classId === classId;

    const matchesSubject =
      subjectId === "" || assignment.subjectId === subjectId;

    const matchesStatus =
      status === "" || assignment.status.toString() === status;

    return (
      matchesSearch &&
      matchesTeacher &&
      matchesClass &&
      matchesSubject &&
      matchesStatus
    );
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

  const getStatusClass = (status: number) => {
    switch (status) {
      case 1:
        return "bg-success/10 text-success";

      case 0:
        return "bg-warning/10 text-warning";

      case 2:
        return "bg-danger/10 text-danger";

      default:
        return "bg-background text-text-secondary";
    }
  };

  const handleAssignmentClick = (assignmentId: string) => {
    navigate(`/admin/assignments/${assignmentId}/details`);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-text-secondary">
          Loading assignments...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-danger">
          Failed to load assignments.
        </p>
      </Card>
    );
  }

  return (
    <>
      {/* ================= DESKTOP / TABLET ================= */}
      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-background">
              <tr className="border-b border-border">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  #
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Title
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Teacher
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Class
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Subject
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Deadline
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAssignments.map((assignment, index) => (
                <tr
                  key={assignment.id}
                  onClick={() => handleAssignmentClick(assignment.id)}
                  className="
                    cursor-pointer
                    border-b
                    border-border
                    last:border-b-0
                    transition
                    hover:bg-primary/5
                  "
                >
                  <td className="px-5 py-4 text-sm text-text-muted">
                    {index + 1}
                  </td>

                  <td className="max-w-[220px] px-5 py-4">
                    <p className="truncate font-medium text-text-primary">
                      {assignment.title}
                    </p>
                  </td>

                  <td className="max-w-[180px] px-5 py-4">
                    <p className="truncate text-sm text-text-secondary">
                      {assignment.teacherName}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-text-secondary">
                    {assignment.className}
                  </td>

                  <td className="max-w-[180px] px-5 py-4">
                    <p className="truncate text-sm text-text-secondary">
                      {assignment.subjectName}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-text-secondary">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getStatusClass(assignment.status)}
                      `}
                    >
                      {getStatusLabel(assignment.status)}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredAssignments.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-text-muted"
                  >
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ================= MOBILE ================= */}
      <div className="space-y-3 md:hidden">
        {filteredAssignments.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-sm text-text-muted">
              No assignments found.
            </p>
          </Card>
        ) : (
          filteredAssignments.map((assignment, index) => (
            <Card
              key={assignment.id}
              onClick={() => handleAssignmentClick(assignment.id)}
              className="
                cursor-pointer
                overflow-hidden
                transition
                hover:border-primary/30
                hover:bg-primary/5
              "
            >
              <div className="p-4">
                {/* Title + Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-text-muted">
                      Assignment #{index + 1}
                    </p>

                    <h3 className="mt-1 break-words font-semibold text-text-primary">
                      {assignment.title}
                    </h3>
                  </div>

                  <span
                    className={`
                      shrink-0
                      rounded-full
                      px-2.5
                      py-1
                      text-[11px]
                      font-semibold
                      ${getStatusClass(assignment.status)}
                    `}
                  >
                    {getStatusLabel(assignment.status)}
                  </span>
                </div>

                {/* Assignment Info */}
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
                  <InfoItem label="Teacher" value={assignment.teacherName} />

                  <InfoItem label="Class" value={assignment.className} />

                  <InfoItem label="Subject" value={assignment.subjectName} />

                  <InfoItem
                    label="Deadline"
                    value={new Date(assignment.deadline).toLocaleDateString()}
                  />
                </div>
              </div>

              {/* Click indicator */}
              <div
                className="
                  border-t
                  border-border
                  px-4
                  py-2.5
                  text-right
                  text-xs
                  font-medium
                  text-primary
                "
              >
                View details →
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-medium text-text-muted">{label}</p>

      <p className="mt-1 truncate text-sm font-medium text-text-primary">
        {value}
      </p>
    </div>
  );
}
