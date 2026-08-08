import Card from "@/components/ui/Card";

import { useTeacherAssign } from "@/features/admin/teacher-assign/hooks/useTeacherAssign";

type TeacherAssignTableProps = {
  search: string;
};

export default function TeacherAssignTable({
  search,
}: TeacherAssignTableProps) {
  const {
    data: assign = [],
    isLoading,
    isError,
  } = useTeacherAssign();

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
                  className="text-danger transition hover:opacity-70"
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
    </Card>
  );
}
