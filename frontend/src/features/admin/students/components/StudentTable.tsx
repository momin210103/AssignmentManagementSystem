import { Eye, Pencil, Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";

import { useDeleteStudent } from "../hooks/useDeleteStudent";
import { useStudents } from "../hooks/useStudents";
import type { Student } from "../services/studentApi";

type StudentTableProps = {
  search: string;
  onEditStudent: (student: Student) => void;
};

export default function StudentTable({
  search,
  onEditStudent,
}: StudentTableProps) {
  const { data: students = [], isLoading } = useStudents();
  const deleteStudentMutation = useDeleteStudent();

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    return (
      student.fullName.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.className.toLowerCase().includes(query)
    );
  });

  const handleDelete = (student: Student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.fullName}?`,
    );

    if (confirmed) {
      deleteStudentMutation.mutate(student.id);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-text-secondary">
          Loading students...
        </p>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop / Tablet */}
      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr className="border-b border-border">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Name
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Class
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-border last:border-b-0 transition hover:bg-background"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-text-primary">
                      {student.fullName}
                    </p>
                  </td>

                  <td className="max-w-[280px] px-5 py-4">
                    <p className="truncate text-sm text-text-secondary">
                      {student.email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-text-secondary">
                    {student.className} ({student.section})
                  </td>

                  <td className="px-5 py-4">
                    <StudentActions
                      student={student}
                      onEdit={onEditStudent}
                      onDelete={handleDelete}
                      isDeleting={deleteStudentMutation.isPending}
                    />
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-sm text-text-muted"
                  >
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredStudents.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-sm text-text-muted">
              No students found.
            </p>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="overflow-hidden">
              {/* Student Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-text-primary">
                      {student.fullName}
                    </h3>

                    <p className="mt-1 truncate text-sm text-text-secondary">
                      {student.email}
                    </p>
                  </div>

                  <div className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Student
                  </div>
                </div>

                {/* Class */}
                <div className="mt-4">
                  <p className="text-xs font-medium text-text-muted">Class</p>

                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {student.className} ({student.section})
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-border px-4 py-3">
                <StudentActions
                  student={student}
                  onEdit={onEditStudent}
                  onDelete={handleDelete}
                  isDeleting={deleteStudentMutation.isPending}
                  mobile
                />
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

type StudentActionsProps = {
  student: Student;
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  isDeleting: boolean;
  mobile?: boolean;
};

function StudentActions({
  student,
  onEdit,
  onDelete,
  isDeleting,
  mobile = false,
}: StudentActionsProps) {
  return (
    <div
      className={`flex items-center ${
        mobile ? "justify-end gap-2" : "justify-center gap-3"
      }`}
    >
      <button
        type="button"
        className="
          flex h-9 w-9 items-center justify-center
          rounded-lg text-primary
          transition hover:bg-primary/10
        "
        title="View"
        aria-label={`View ${student.fullName}`}
      >
        <Eye size={18} />
      </button>

      <button
        type="button"
        onClick={() => onEdit(student)}
        className="
          flex h-9 w-9 items-center justify-center
          rounded-lg text-warning
          transition hover:bg-warning/10
        "
        title="Edit"
        aria-label={`Edit ${student.fullName}`}
      >
        <Pencil size={18} />
      </button>

      <button
        type="button"
        onClick={() => onDelete(student)}
        disabled={isDeleting}
        className="
          flex h-9 w-9 items-center justify-center
          rounded-lg text-danger
          transition hover:bg-danger/10
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
        title="Delete"
        aria-label={`Delete ${student.fullName}`}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
