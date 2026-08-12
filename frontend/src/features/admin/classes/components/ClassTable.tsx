import Card from "@/components/ui/Card";

import { useClasses } from "../hooks/useClasses";

type ClassTableProps = {
  search: string;
};

export default function ClassTable({ search }: ClassTableProps) {
  const { data: classes = [], isLoading, isError } = useClasses();

  const query = search.toLowerCase();

  const filteredClasses = classes.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.section.toLowerCase().includes(query),
  );

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-text-secondary">
          Loading classes...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-danger">
          Failed to load classes.
        </p>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop */}
      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr className="border-b border-border">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  #
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Class
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Section
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredClasses.map((item, index) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    border-border
                    last:border-b-0
                    hover:bg-background
                  "
                >
                  <td className="px-5 py-4 text-sm text-text-muted">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4 font-medium text-text-primary">
                    {item.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-text-secondary">
                    {item.section}
                  </td>
                </tr>
              ))}

              {filteredClasses.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-12 text-center text-sm text-text-muted"
                  >
                    No classes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredClasses.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-text-muted">Class</p>

                <h3 className="mt-1 font-semibold text-text-primary">
                  {item.name}
                </h3>
              </div>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Section {item.section}
              </span>
            </div>
          </Card>
        ))}

        {filteredClasses.length === 0 && (
          <Card className="p-6">
            <p className="text-center text-sm text-text-muted">
              No classes found.
            </p>
          </Card>
        )}
      </div>
    </>
  );
}
