import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import CreateAssignmentForm from "../components/CreateAssignmentForm";

export default function CreateAssignmentPage() {
  const navigate = useNavigate();

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
            Create Assignment
          </h1>

          <p className="mt-1 text-text-secondary">
            Create a new assignment for your class.
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-3xl p-6">
        <CreateAssignmentForm
          onSuccess={() => navigate("/teacher/assignments")}
          onCancel={() => navigate("/teacher/assignments")}
        />
      </Card>
    </div>
  );
}
