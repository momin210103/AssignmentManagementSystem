import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";

import { useTeachers } from "../hooks/useTeachers";
import type { Teacher } from "../types/teacher";

type TeacherTableProps = {
  search: string;
};

export default function TeacherTable({ search }: TeacherTableProps) {
  const { data: teachers = [], isLoading } = useTeachers();
  const navigate = useNavigate();

  const filteredTeachers = teachers.filter((teacher) => {
    const query = search.toLowerCase();

    return (
      teacher.fullName.toLowerCase().includes(query) ||
      teacher.email.toLowerCase().includes(query)
    );
  });

  const handleTeacherClick = (teacherId: string) => {
    navigate(`/admin/teachers/${teacherId}`);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-text-secondary">
          Loading teachers...
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

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr
                  key={teacher.id}
                  onClick={() => handleTeacherClick(teacher.id)}
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
                      {teacher.fullName}
                    </p>
                  </td>

                  <td className="max-w-[320px] px-5 py-4">
                    <p className="truncate text-sm text-text-secondary">
                      {teacher.email}
                    </p>
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

              {filteredTeachers.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-12 text-center text-sm text-text-muted"
                  >
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {filteredTeachers.length === 0 ? (
          <Card className="p-6">
            <p className="text-center text-sm text-text-muted">
              No teachers found.
            </p>
          </Card>
        ) : (
          filteredTeachers.map((teacher) => (
            <Card
              key={teacher.id}
              onClick={() => handleTeacherClick(teacher.id)}
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
                  {teacher.fullName.charAt(0).toUpperCase()}
                </div>

                {/* Teacher Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-text-primary">
                    {teacher.fullName}
                  </h3>

                  <p className="mt-0.5 truncate text-sm text-text-secondary">
                    {teacher.email}
                  </p>

                  <p className="mt-1 text-xs text-text-muted">Teacher</p>
                </div>

                {/* Arrow */}
                <ChevronRight size={19} className="shrink-0 text-text-muted" />
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
