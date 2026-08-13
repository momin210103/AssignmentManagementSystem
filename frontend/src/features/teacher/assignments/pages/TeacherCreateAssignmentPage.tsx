import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@/components/ui/Card";
import Toast from "@/components/ui/Toast";

import CreateAssignmentForm from "../components/CreateAssignmentForm";

export default function CreateAssignmentPage() {
  const navigate = useNavigate();

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });

    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}

      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => navigate("/teacher/assignments")}
          aria-label="Back to assignments"
          className="
            flex
            h-9
            w-9
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
            sm:h-10
            sm:w-10
          "
        >
          <ArrowLeft size={18} />
        </button>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Create Assignment
          </h1>

          <p className="mt-1 text-sm text-text-secondary sm:text-base">
            Create a new assignment for your class.
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="w-full p-4 sm:p-6 lg:max-w-3xl">
        <CreateAssignmentForm
          onSuccess={() => {
            showToast("Assignment created successfully.", "success");
            navigate("/teacher/assignments");
          }}
          onCancel={() => navigate("/teacher/assignments")}
        />
      </Card>
    </div>
  );
}
