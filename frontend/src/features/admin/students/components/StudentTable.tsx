import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";

import { useStudents } from "../hooks/useStudents";
import type { Student } from "../services/studentApi";

type StudentTableProps = {
  search: string;
};

export default function StudentTable({ search }: StudentTableProps) {
  const { data: students = [], isLoading } = useStudents();
  const navigate = useNavigate();

  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase();

    return (
      student.fullName.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.className.toLowerCase().includes(query)
    );
  });

  const handleStudentClick = (studentId: string) => {
    navigate(`/admin/students/${studentId}`);
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

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => handleStudentClick(student.id)}
                  className="
                    group
                    cursor-pointer
                    border-b
                    border-border
                    last:border-b-0
                    transition
                    hover:bg-primary/5
                  "
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-text-primary transition group-hover:text-primary">
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
                    <div className="flex justify-end">
                      <ChevronRight
                        size={19}
                        className="
                          text-text-muted
                          transition
                          group-hover:translate-x-1
                          group-hover:text-primary
                        "
                      />
                    </div>
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
            <Card
              key={student.id}
              onClick={() => handleStudentClick(student.id)}
              className="
                cursor-pointer
                overflow-hidden
                transition
                hover:border-primary/30
                hover:bg-primary/5
              "
            >
              <div className="flex items-center gap-4 p-4">
                {/* Avatar */}
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-primary/10
                    text-sm
                    font-bold
                    text-primary
                  "
                >
                  {student.fullName.charAt(0).toUpperCase()}
                </div>

                {/* Student Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-text-primary">
                    {student.fullName}
                  </h3>

                  <p className="mt-0.5 truncate text-sm text-text-secondary">
                    {student.email}
                  </p>

                  <p className="mt-1 text-xs text-text-muted">
                    {student.className} ({student.section})
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight
                  size={19}
                  className="
                    shrink-0
                    text-text-muted
                    transition
                  "
                />
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
