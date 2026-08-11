import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useGetAssignmentById } from "@/features/teacher/assignments/hooks/useGetAssignmentById";
import { useDeleteAssignment } from "@/features/teacher/assignments/hooks/useDeleteAssignment";

export default function AdminAssignmentDetailsPage() {
  const navigate = useNavigate();
  const deleteMutation = useDeleteAssignment();

  const { assignmentId } = useParams<{
    assignmentId: string;
  }>();

  const {
    data: assignment,
    isLoading,
    isError,
  } = useGetAssignmentById(assignmentId ?? "");

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-success/10 text-success";

      case "draft":
        return "bg-warning/10 text-warning";

      case "closed":
        return "bg-danger/10 text-danger";

      default:
        return "bg-background text-text-secondary";
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="py-10 text-center text-sm text-text-muted">
          Loading assignment details...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="py-10 text-center text-sm text-danger">
          Failed to load assignment details.
        </p>
      </Card>
    );
  }

  if (!assignment) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <h2 className="text-lg font-semibold text-text-primary">
            Assignment not found
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            The assignment you are looking for does not exist.
          </p>

          <Button
            type="button"
            variant="secondary"
            leftIcon={<ArrowLeft size={17} />}
            onClick={() => navigate("/admin/assignments")}
            className="mt-5"
          >
            Back to Assignments
          </Button>
        </div>
      </Card>
    );
  }
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${assignment.title}"?`,
    );

    if (!confirmed) return;

    deleteMutation.mutate(assignment.id, {
      onSuccess: () => navigate("/admin/assignments"),
    });
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin/assignments")}
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
          aria-label="Back to assignments"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Assignment Details
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            View assignment information.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            leftIcon={<Trash2 size={16} />}
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
            className="text-danger"
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Assignment Header */}
      <Card className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="break-words text-xl font-bold text-text-primary sm:text-2xl">
              {assignment.title}
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              Created on {new Date(assignment.createdAt).toLocaleDateString()}
            </p>
          </div>

          <span
            className={`
              w-fit
              shrink-0
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${getStatusClass(assignment.status)}
            `}
          >
            {assignment.status}
          </span>
          
        </div>
        
      </Card>

      {/* Assignment Information */}
      <Card className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-text-primary">
          Assignment Information
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem
            icon={<User size={18} />}
            label="Teacher"
            value={assignment.teacherName ?? "Not available"}
          />

          <InfoItem
            icon={<GraduationCap size={18} />}
            label="Class"
            value={
              assignment.section
                ? `${assignment.className} (${assignment.section})`
                : assignment.className
            }
          />

          <InfoItem
            icon={<BookOpen size={18} />}
            label="Subject"
            value={assignment.subjectName}
          />

          <InfoItem
            icon={<CalendarDays size={18} />}
            label="Deadline"
            value={new Date(assignment.deadline).toLocaleString()}
          />

          <InfoItem
            label="Maximum Marks"
            value={String(assignment.maximumMarks)}
          />

          <InfoItem label="Status" value={assignment.status} />
        </div>
      </Card>

      {/* Description */}
      <Card className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-text-primary">Description</h2>

        <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
          {assignment.description || "No description provided."}
        </p>
      </Card>
    </div>
  );
}

type InfoItemProps = {
  icon?: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      {icon && (
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
            text-primary
          "
        >
          {icon}
        </div>
      )}

      <div className="min-w-0">
        <p className="text-xs font-medium text-text-muted">{label}</p>

        <p className="mt-1 break-words text-sm font-medium text-text-primary">
          {value}
        </p>
      </div>
    </div>
  );
}
