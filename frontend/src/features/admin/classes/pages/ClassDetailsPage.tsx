import { ArrowLeft, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useStudentsByClass } from "../hooks/useStudentsByClass";

export default function ClassDetailsPage() {
  const navigate = useNavigate();

  const { classId } = useParams<{
    classId: string;
  }>();

  const {
    data: students = [],
    isLoading,
    isError,
  } = useStudentsByClass(classId ?? "");

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="py-10 text-center text-sm text-text-muted">
          Loading students...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="py-10 text-center text-sm text-danger">
          Failed to load students.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/classes")}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-border
            text-text-secondary
            transition
            hover:bg-primary/10
            hover:text-primary
          "
          aria-label="Back to classes"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Class Management
          </p>

          <h1 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">
            Class Students
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Students assigned to this class.
          </p>
        </div>
      </div>

      {/* Summary */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-primary/10
              text-primary
            "
          >
            <Users size={20} />
          </div>

          <div>
            <p className="text-2xl font-bold text-text-primary">
              {students.length}
            </p>

            <p className="text-sm text-text-secondary">
              Students in this class
            </p>
          </div>
        </div>
      </Card>

      {/* Students */}
      <Card className="overflow-hidden">
        {students.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-text-muted">
              No students assigned to this class.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead className="bg-background">
                  <tr className="border-b border-border">
                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      #
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      Name
                    </th>

                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      Email
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={index + 1}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="px-5 py-4 text-sm text-text-muted">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 font-medium text-text-primary">
                        {student.fullName}
                      </td>

                      <td className="px-5 py-4 text-sm text-text-secondary">
                        {student.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="space-y-3 p-4 md:hidden">
              {students.map((student, index) => (
                <div
                  key={index+1}
                  className="rounded-xl border border-border p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-primary/10
                        text-sm
                        font-semibold
                        text-primary
                      "
                    >
                      {index + 1}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold text-text-primary">
                        {student.fullName}
                      </p>

                      <p className="mt-1 truncate text-sm text-text-secondary">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
