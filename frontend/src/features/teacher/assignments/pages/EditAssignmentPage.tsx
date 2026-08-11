import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "@/components/ui/Card";

import { useGetAssignmentById } from "../hooks/useGetAssignmentById";
import EditAssignmentForm from "../components/EditAssignmentForm";

export default function EditAssignmentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: assignment, isLoading, isError } = useGetAssignmentById(id!);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-text-muted">
        Loading assignment...
      </div>
    );
  }

  if (isError || !assignment) {
    return (
      <div className="py-10 text-center text-danger">
        Failed to load assignment.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-8xl space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back to assignments"
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full border border-border text-text-secondary
            transition hover:bg-primary/10 hover:text-primary
            sm:h-10 sm:w-10
          "
        >
          <ArrowLeft size={18} />
        </button>

        <div className="min-w-0">
          <h1 className="text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
            Edit Assignment
          </h1>

          <p className="mt-0.5 text-xs text-text-secondary sm:text-sm">
            Update your assignment details.
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="p-4 sm:p-6">
        <EditAssignmentForm
          assignment={assignment}
          onSuccess={() => navigate("/teacher/assignments")}
          onCancel={() => navigate("/teacher/assignments")}
        />
      </Card>
    </div>
  );
}
