import { ArrowLeft, Trash2, Users } from "lucide-react";
import { useNavigate, useParams, } from "react-router-dom";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmAlert from "@/components/ui/ConfirmAlert";
import Toast from "@/components/ui/Toast";

import { useRemoveStudentFromClass } from "../hooks/useRemoveStudentFromClass";
import { useStudentsByClass } from "../hooks/useStudentsByClass";

export default function ClassDetailsPage() {
  const navigate = useNavigate();
  const [studentToRemove, setStudentToRemove] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { classId } = useParams<{
    classId: string;
  }>();

  const {
    data: students = [],
    isLoading,
    isError,
  } = useStudentsByClass(classId ?? "");

  const removeStudentMutation = useRemoveStudentFromClass();

  const handleRemoveStudent = () => {
    if (!classId || !studentToRemove) return;

    removeStudentMutation.mutate(
      {
        classId,
        studentId: studentToRemove.id,
      },
      {
        onSuccess: () => {
          setStudentToRemove(null);
          setToastMessage("Student removed from class successfully.");
          setTimeout(() => setToastMessage(null), 3000);
        },
      },
    );
  };

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
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => navigate("/admin/classes")}
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-full
            border border-border
            text-text-secondary
            transition
            hover:bg-primary/10
            hover:text-primary
            sm:h-10 sm:w-10
          "
          aria-label="Back to classes"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="min-w-0">
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
              flex h-12 w-12 shrink-0
              items-center justify-center
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
              {students.length === 1
                ? "Student in this class"
                : "Students in this class"}
            </p>
          </div>
        </div>
      </Card>

      {/* Students */}
      <Card className="overflow-hidden">
        {students.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Desktop / Tablet */}
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

                    <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {students.map((student, index) => (
                    <tr
                      key={student.id}
                      className="
                        border-b
                        border-border
                        last:border-b-0
                        transition
                        hover:bg-background
                      "
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

                      <td className="px-5 py-4 text-center">
                        <RemoveButton
                          studentName={student.fullName}
                          isPending={removeStudentMutation.isPending}
                          onRemove={() =>
                            setStudentToRemove({ id: student.id, name: student.fullName })
                          }
                        />
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
                  key={student.id}
                  className="
                    rounded-xl
                    border border-border
                    p-4
                  "
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div
                        className="
                          flex h-9 w-9 shrink-0
                          items-center justify-center
                          rounded-lg
                          bg-primary/10
                          text-sm font-semibold
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

                    <RemoveButton
                      studentName={student.fullName}
                      isPending={removeStudentMutation.isPending}
                      onRemove={() =>
                        setStudentToRemove({ id: student.id, name: student.fullName })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Card>
      <ConfirmAlert
        isOpen={studentToRemove !== null}
        title="Remove Student"
        message={
          studentToRemove
            ? `Are you sure you want to remove ${studentToRemove.name} from this class? The student account will not be deleted.`
            : ""
        }
        confirmText="Remove"
        cancelText="Cancel"
        isLoading={removeStudentMutation.isPending}
        onCancel={() => {
          if (!removeStudentMutation.isPending) {
            setStudentToRemove(null);
          }
        }}
        onConfirm={handleRemoveStudent}
      />
      {toastMessage && <Toast message={toastMessage} type="success" />}
    </div>
  );
}

type RemoveButtonProps = {
  studentName: string;
  isPending: boolean;
  onRemove: () => void;
};

function RemoveButton({ studentName, isPending, onRemove }: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onRemove}
      disabled={isPending}
      title={`Remove ${studentName} from class`}
      aria-label={`Remove ${studentName} from class`}
      className="
        inline-flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        text-danger
        transition
        hover:bg-danger/10
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <Trash2 size={16} />
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div
        className="
          flex h-12 w-12
          items-center justify-center
          rounded-xl
          bg-primary/10
          text-primary
        "
      >
        <Users size={20} />
      </div>

      <h3 className="mt-4 font-semibold text-text-primary">
        No students assigned
      </h3>

      <p className="mt-1 text-sm text-text-muted">
        There are no students assigned to this class yet.
      </p>
    </div>
  );
}
