import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardList,
  Edit,
  Eye,
  EyeOff,
  GraduationCap,
  Trash2,
  Users,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmAlert from "@/components/ui/ConfirmAlert";

import { useGetAssignmentById } from "../hooks/useGetAssignmentById";
import { usePublishAssignment } from "@/features/teacher/assignments/hooks/usePublishAssignment";
import { useUnpublishAssignment } from "@/features/teacher/assignments/hooks/useUnpublishAssignment";
import { useDeleteAssignment } from "@/features/teacher/assignments/hooks/useDeleteAssignment";

export default function TeacherAssignmentDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: assignment,
    isLoading,
    isError,
  } = useGetAssignmentById(id ?? "");

  const publishMutation = usePublishAssignment();
  const unpublishMutation = useUnpublishAssignment();
  const deleteMutation = useDeleteAssignment();

  // Confirm dialog state (must be declared unconditionally)
  const [confirm, setConfirm] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    action?: "publish" | "unpublish" | "delete";
  }>({ isOpen: false, message: "" });

  if (isLoading) {
    return (
      <Card>
        <div className="py-12 text-center">
          <p className="text-text-muted">Loading assignment...</p>
        </div>
      </Card>
    );
  }

  if (isError || !assignment) {
    return (
      <Card>
        <div className="py-12 text-center">
          <p className="text-danger">Failed to load assignment.</p>

          <Button
            type="button"
            variant="secondary"
            className="mt-4"
            onClick={() => navigate("/teacher/assignments")}
          >
            Back to Assignments
          </Button>
        </div>
      </Card>
    );
  }

  const isDraft = assignment.status === "Draft";
  const isPublished = assignment.status === "Published";
  const deadline = new Date(assignment.deadline);

  const handlePublish = () => {
    setConfirm({
      isOpen: true,
      title: "Publish assignment",
      message: "Are you sure you want to publish this assignment?",
      action: "publish",
    });
  };

  const handleUnpublish = () => {
    setConfirm({
      isOpen: true,
      title: "Unpublish assignment",
      message: "Are you sure you want to unpublish this assignment?",
      action: "unpublish",
    });
  };

  const handleDelete = () => {
    setConfirm({
      isOpen: true,
      title: "Delete assignment",
      message: `Are you sure you want to delete "${assignment.title}"?`,
      action: "delete",
    });
  };

  const handleConfirm = () => {
    if (!confirm.action) return;

    if (confirm.action === "publish") {
      publishMutation.mutate(assignment.id, {
        onSuccess: () => setConfirm((c) => ({ ...c, isOpen: false })),
      });
      return;
    }

    if (confirm.action === "unpublish") {
      unpublishMutation.mutate(assignment.id, {
        onSuccess: () => setConfirm((c) => ({ ...c, isOpen: false })),
      });
      return;
    }

    if (confirm.action === "delete") {
      deleteMutation.mutate(assignment.id, {
        onSuccess: () => navigate("/teacher/assignments"),
      });
      return;
    }
  };

  return (
    <div className="mx-auto max-w-8xl space-y-4 sm:space-y-6">
      <ConfirmAlert
        isOpen={confirm.isOpen}
        title={confirm.title}
        message={confirm.message}
        isLoading={
          (confirm.action === "publish" && publishMutation.isPending) ||
          (confirm.action === "unpublish" && unpublishMutation.isPending) ||
          (confirm.action === "delete" && deleteMutation.isPending)
        }
        onConfirm={handleConfirm}
        onCancel={() => setConfirm((c) => ({ ...c, isOpen: false }))}
      />
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/teacher/assignments")}
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
              Assignment Details
            </h1>

            <p className="mt-0.5 text-xs text-text-secondary sm:text-sm">
              Manage this assignment and review submissions.
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            leftIcon={<Edit size={16} />}
            onClick={() =>
              navigate(`/teacher/assignments/${assignment.id}/edit`)
            }
          >
            Edit
          </Button>

          {isDraft && (
            <Button
              type="button"
              variant="secondary"
              leftIcon={<Eye size={16} />}
              disabled={publishMutation.isPending}
              onClick={handlePublish}
            >
              Publish
            </Button>
          )}

          {isPublished && (
            <Button
              type="button"
              variant="secondary"
              leftIcon={<EyeOff size={16} />}
              disabled={unpublishMutation.isPending}
              onClick={handleUnpublish}
            >
              Unpublish
            </Button>
          )}

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

      {/* Assignment header — title, status, marks */}
      <Card>
        <div className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                <ClipboardList size={22} className="sm:hidden" />
                <ClipboardList size={24} className="hidden sm:block" />
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-lg font-semibold text-text-primary sm:text-2xl">
                  {assignment.title}
                </h2>

                <span className="mt-2 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {assignment.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-4 sm:block sm:border-0 sm:pt-0 sm:text-right">
              <p className="text-sm text-text-secondary">Maximum Marks</p>

              <p className="text-xl font-bold text-text-primary sm:mt-1 sm:text-2xl">
                {assignment.maximumMarks}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Class / Section / Subject */}
      <Card>
        <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <div className="flex items-center gap-3 p-4 sm:p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-10 sm:w-10">
              <GraduationCap size={18} className="sm:hidden" />
              <GraduationCap size={20} className="hidden sm:block" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-text-secondary">Class</p>

              <p className="mt-1 truncate font-semibold text-text-primary">
                {assignment.className} - {assignment.section}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 sm:p-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-10 sm:w-10">
              <BookOpen size={18} className="sm:hidden" />
              <BookOpen size={20} className="hidden sm:block" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium text-text-secondary">Subject</p>

              <p className="mt-1 truncate font-semibold text-text-primary">
                {assignment.subjectName}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Description */}
      <Card>
        <div className="border-b border-border p-4 sm:p-5">
          <h2 className="text-base font-semibold text-text-primary sm:text-lg">
            Description
          </h2>
        </div>

        <div className="p-4 sm:p-5">
          <div className="min-h-24 whitespace-pre-wrap rounded-xl border border-border bg-background p-4 text-sm leading-6 text-text-secondary sm:min-h-32 sm:p-5 sm:leading-7">
            {assignment.description || "No description provided."}
          </div>
        </div>
      </Card>

      {/* Deadline */}
      <Card className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning sm:h-11 sm:w-11">
            <CalendarDays size={20} className="sm:hidden" />
            <CalendarDays size={22} className="hidden sm:block" />
          </div>

          <div>
            <p className="text-sm text-text-secondary">Submission Deadline</p>

            <p className="mt-1 font-semibold text-text-primary">
              {deadline.toLocaleDateString()}
              <span className="ml-2 font-normal text-text-secondary">
                {deadline.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </p>
          </div>
        </div>
      </Card>

      {/* View submissions */}
      <Card>
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users size={22} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                Student Submissions
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Review answers, files, and assign grades.
              </p>
            </div>
          </div>

          <Button
            type="button"
            leftIcon={<ClipboardList size={18} />}
            className="w-full sm:w-auto"
            onClick={() =>
              navigate(`/teacher/assignments/${assignment.id}/submissions`)
            }
          >
            View Submissions
          </Button>
        </div>
      </Card>
    </div>
  );
}
