import { useState } from "react";
import { Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";
import ConfirmAlert from "@/components/ui/ConfirmAlert";
import Toast from "@/components/ui/Toast";

import { useSubjects } from "../hooks/useSubjects";
import { useDeleteSubject } from "../hooks/useDeleteSubject";

type SubjectTableProps = {
  search: string;
};

export default function SubjectTable({ search }: SubjectTableProps) {
  const { data: subjects = [], isLoading, isError } = useSubjects();
  const [subjectToDelete, setSubjectToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(search.toLowerCase()),
  );
  const deleteSubjectMutation = useDeleteSubject();

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-text-secondary">Loading subjects...</p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-center text-danger">Failed to load subjects.</p>
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
              Subject Name
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredSubjects.map((subject, index) => (
            <tr
              key={subject.id}
              className="border-b border-border hover:bg-background"
            >
              <td className="px-6 py-4 text-text-muted">{index + 1}</td>

              <td className="px-6 py-4 font-medium text-text-primary">
                {subject.name}
              </td>

              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() =>
                    setSubjectToDelete({ id: subject.id, name: subject.name })
                  }
                  disabled={deleteSubjectMutation.isPending}
                  className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          text-danger
          transition
          hover:bg-danger/10
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
                  title="Delete"
                  aria-label={`Delete ${subject.name}`}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}

          {filteredSubjects.length === 0 && (
            <tr>
              <td colSpan={3} className="py-10 text-center text-text-muted">
                No subjects found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmAlert
        isOpen={subjectToDelete !== null}
        title="Delete Subject"
        message={
          subjectToDelete
            ? `Are you sure you want to delete ${subjectToDelete.name}?`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteSubjectMutation.isPending}
        onCancel={() => setSubjectToDelete(null)}
        onConfirm={() => {
          if (subjectToDelete) {
            deleteSubjectMutation.mutate(subjectToDelete.id, {
              onSuccess: () => {
                setSubjectToDelete(null);
                setToastMessage("Subject deleted successfully.");
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
