import { Eye, Pencil, Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";

import { useStudents } from "../hooks/useStudents";

import type { Student } from "../services/studentApi";

import { useDeleteStudent } from "../hooks/useDeleteStudent";

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
  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-text-secondary">Loading students...</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <table className="w-full">
        <thead className="bg-background">
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Class
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Phone
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr
              key={student.id}
              className="border-b border-border hover:bg-background"
            >
              <td className="px-6 py-4 font-medium text-text-primary">
                {student.fullName}
              </td>

              <td className="px-6 py-4 text-text-secondary">{student.email}</td>

              <td className="px-6 py-4 text-text-secondary">
                {student.className} ({student.section})
              </td>

              <td className="px-6 py-4 text-text-secondary">
                {student.phoneNumber ?? "-"}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    className="text-primary transition hover:opacity-70"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEditStudent(student)}
                    className="text-warning transition hover:opacity-70"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Are you sure you want to delete ${student.fullName}?`,
                      );

                      if (confirmed) {
                        deleteStudentMutation.mutate(student.id);
                      }
                    }}
                    disabled={deleteStudentMutation.isPending}
                    className="text-danger transition hover:opacity-70 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {!isLoading && filteredStudents.length === 0 && (
            <tr>
              <td colSpan={5} className="py-10 text-center text-text-muted">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
