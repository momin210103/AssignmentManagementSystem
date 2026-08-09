import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useAssignment } from "../hooks/useAssignment";
import EditAssignmentForm from "../components/EditAssignmentForm";

export default function EditAssignmentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: assignment, isLoading, isError } = useAssignment(id!);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="secondary"
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate("/teacher/assignments")}
        >
          Back
        </Button>

        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Edit Assignment
          </h1>

          <p className="mt-1 text-text-secondary">
            Update your assignment details.
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-3xl p-6">
        <EditAssignmentForm
          assignment={assignment}
          onSuccess={() => navigate("/teacher/assignments")}
          onCancel={() => navigate("/teacher/assignments")}
        />
      </Card>
    </div>
  );
}
