import { Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";

import { useSubjects } from "../hooks/useSubjects";
import { useDeleteSubject } from "../hooks/useDeleteSubject";

type SubjectTableProps = {
  search: string;
};

export default function SubjectTable({ search }: SubjectTableProps) {
  const { data: subjects = [], isLoading, isError } = useSubjects();

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
                  onClick={() => {
                    const confirmed = window.confirm(
                      `Are you sure you want to delete ${subject.name}?`,
                    );

                    if (confirmed) {
                      deleteSubjectMutation.mutate(subject.id);
                    }
                  }}
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
    </Card>
  );
}
