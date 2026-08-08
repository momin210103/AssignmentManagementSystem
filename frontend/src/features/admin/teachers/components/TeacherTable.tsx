import { Eye, Pencil, Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";

import { useDeleteTeacher } from "../hooks/useDeleteTeacher";
import { useTeachers } from "../hooks/useTeachers";
import type { Teacher } from "../types/teacher";

type TeacherTableProps = {
  search: string;
  onEditTeacher: (teacher: Teacher) => void;
};

export default function TeacherTable({
  search,
  onEditTeacher,
}: TeacherTableProps) {
  const { data: teachers = [], isLoading } = useTeachers();

  const deleteTeacherMutation = useDeleteTeacher();

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.fullName.toLowerCase().includes(search.toLowerCase()) ||
      teacher.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-text-secondary">Loading teachers...</p>
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

            <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredTeachers.map((teacher) => (
            <tr
              key={teacher.id}
              className="border-b border-border hover:bg-background"
            >
              <td className="px-6 py-4 font-medium text-text-primary">
                {teacher.fullName}
              </td>

              <td className="px-6 py-4 text-text-secondary">{teacher.email}</td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  {/* View */}
                  <button
                    type="button"
                    className="text-primary transition hover:opacity-70"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={() => onEditTeacher(teacher)}
                    className="text-warning transition hover:opacity-70"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Are you sure you want to delete ${teacher.fullName}?`,
                      );

                      if (confirmed) {
                        deleteTeacherMutation.mutate(teacher.id);
                      }
                    }}
                    disabled={deleteTeacherMutation.isPending}
                    className="text-danger transition hover:opacity-70 disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {filteredTeachers.length === 0 && (
            <tr>
              <td colSpan={3} className="py-10 text-center text-text-muted">
                No teachers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
