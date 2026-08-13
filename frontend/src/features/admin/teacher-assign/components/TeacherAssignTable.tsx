import { useState } from "react";
import Card from "@/components/ui/Card";
import ConfirmAlert from "@/components/ui/ConfirmAlert";
import Toast from "@/components/ui/Toast";

import { useTeacherAssign } from "@/features/admin/teacher-assign/hooks/useTeacherAssign";
import { useDeleteTeacherAssign } from "@/features/admin/teacher-assign/hooks/useDeleteTeacherAssign";

type TeacherAssignTableProps = {
  search: string;
};

export default function TeacherAssignTable({
  search,
}: TeacherAssignTableProps) {
  const { data: assign = [], isLoading, isError } = useTeacherAssign();
  const deleteAssignMutation = useDeleteTeacherAssign();
  const [assignToDelete, setAssignToDelete] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredAssign = assign.filter(
    (assign) =>
      assign.className.toLowerCase().includes(search.toLowerCase()) ||
      assign.subjectName.toLowerCase().includes(search.toLowerCase()),
  );

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
        <p className="text-center text-danger">Failed to load assign.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <table className="w-full">
        <thead className="bg-background">
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              #
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Class
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Subject
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredAssign.map((assign, index) => (
            <tr
              key={assign.id}
              className="border-b border-border hover:bg-background"
            >
              <td className="px-6 py-4 text-text-muted">{index + 1}</td>

              <td className="px-6 py-4 font-medium text-text-primary">
                {assign.teacherName}
              </td>

              <td className="px-6 py-4 font-medium text-text-primary">
                {assign.className}
              </td>

              <td className="px-6 py-4 text-text-secondary">
                {assign.subjectName}
              </td>

              <td className="px-6 py-4 text-center">
                <button
                  type="button"
                  disabled={deleteAssignMutation.isPending}
                  onClick={() => setAssignToDelete(assign.id)}
                  className="
    text-danger
    transition
    hover:opacity-70
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredAssign.length === 0 && (
            <tr>
              <td colSpan={4} className="py-10 text-center text-text-muted">
                No assignments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmAlert
        isOpen={assignToDelete !== null}
        title="Delete Teacher Assignment"
        message="Are you sure you want to delete this teacher assignment?"
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteAssignMutation.isPending}
        onCancel={() => setAssignToDelete(null)}
        onConfirm={() => {
          if (assignToDelete) {
            deleteAssignMutation.mutate(assignToDelete, {
              onSuccess: () => {
                setAssignToDelete(null);
                setToastMessage("Teacher assignment deleted successfully.");
                setTimeout(() => setToastMessage(null), 3000);
              },
            });
          }
        }}
      />
      {toastMessage && <Toast message={toastMessage} type="success" />}
    </Card>
  );
}
