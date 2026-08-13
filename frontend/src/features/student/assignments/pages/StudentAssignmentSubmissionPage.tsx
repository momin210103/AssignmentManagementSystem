import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  FileText,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Toast from "@/components/ui/Toast";

import { useCreateSubmission } from "../../submissions/hooks/useCreateSubmission";
import { useMySubmissions } from "../../submissions/hooks/useMySubmissions";
import { useResubmitSubmission } from "../../submissions/hooks/useResubmitSubmission";
import { useUploadSubmissionFile } from "../../submissions/hooks/useUploadSubmissionFile";

type ToastState = {
  message: string;
  type: "success" | "error";
} | null;

export default function StudentAssignmentSubmitPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const { data: submissions = [] } = useMySubmissions();

  const submission = submissions.find((item) => item.assignmentId === id);

  const createSubmissionMutation = useCreateSubmission();
  const resubmitMutation = useResubmitSubmission();
  const uploadFileMutation = useUploadSubmissionFile();

  const apiOrigin = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, "");

  const submittedFileUrl = submission?.fileUrl
    ? `${apiOrigin}${submission.fileUrl}`
    : null;

  useEffect(() => {
    if (submission) {
      setAnswer(submission.answer);
    }
  }, [submission]);

  // Auto-dismiss the toast, and leave the page after a successful submit
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);

      if (toast.type === "success") {
        navigate(`/student/assignments/${id}/details`);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast, navigate, id]);

  const isSubmitted = !!submission;
  const isReadOnly = isSubmitted && !isEditing;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!id || !answer.trim()) {
      return;
    }

    try {
      let fileUrl: string | null = submission?.fileUrl ?? null;

      // Upload new file if selected
      if (file) {
        const uploadResult = await uploadFileMutation.mutateAsync(file);

        fileUrl = uploadResult.fileUrl;
      }

      // Resubmit existing submission
      if (submission && isEditing) {
        await resubmitMutation.mutateAsync({
          submissionId: submission.id,
          answer: answer.trim(),
          fileUrl,
        });

        setToast({
          message: "Assignment resubmitted successfully.",
          type: "success",
        });
      }
      // Create new submission
      else {
        await createSubmissionMutation.mutateAsync({
          assignmentId: id,
          answer: answer.trim(),
          fileUrl,
        });

        setToast({
          message: "Assignment submitted successfully.",
          type: "success",
        });
      }
    } catch (error) {
      console.error("SUBMISSION ERROR:", error);

      setToast({
        message: isEditing
          ? "Failed to resubmit assignment."
          : "Failed to submit assignment.",
        type: "error",
      });
    }
  };

  const isSaving =
    createSubmissionMutation.isPending ||
    resubmitMutation.isPending ||
    uploadFileMutation.isPending;

  return (
    <div className="mx-auto max-w-8xl space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
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
            {isSubmitted ? "Assignment Submission" : "Submit Assignment"}
          </h1>

          <p className="mt-0.5 text-xs text-text-secondary sm:text-sm">
            {isSubmitted
              ? "View your submitted assignment."
              : "Submit your answer and file for this assignment."}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:items-start">
        {/* Main Content */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {/* Answer */}
          <Card>
            <div className="border-b border-border p-4 sm:p-5">
              <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                Your Answer
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                {isReadOnly
                  ? "Your submitted answer."
                  : "Write your answer below."}
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                disabled={isReadOnly || isSaving}
                rows={14}
                placeholder="Write your answer here..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-input-border
                  bg-surface
                  p-4
                  text-sm
                  leading-6
                  text-text-primary
                  outline-none
                  transition
                  focus:border-primary
                  disabled:cursor-not-allowed
                  disabled:bg-background
                  disabled:opacity-80
                "
              />
            </div>
          </Card>

          {/* File */}
          <Card>
            <div className="border-b border-border p-4 sm:p-5">
              <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                Submitted File
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                {isReadOnly
                  ? "Your submitted file."
                  : "Upload your assignment file if required."}
              </p>
            </div>

            <div className="p-4 sm:p-5">
              {/* Existing File - View Mode */}
              {isReadOnly && submission?.fileUrl && (
                <a
                  href={submittedFileUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    rounded-xl
                    border
                    border-border
                    bg-surface
                    p-4
                    transition
                    hover:border-primary
                    hover:bg-primary/5
                  "
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-primary/10
                        text-primary
                      "
                    >
                      <FileText size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary">
                        Submitted File
                      </p>

                      <p className="truncate text-xs text-text-secondary">
                        View submitted file
                      </p>
                    </div>
                  </div>

                  <ExternalLink
                    size={17}
                    className="shrink-0 text-text-muted"
                  />
                </a>
              )}

              {/* No Existing File */}
              {isReadOnly && !submission?.fileUrl && (
                <p className="text-sm text-text-muted">
                  No file was submitted.
                </p>
              )}

              {/* Upload New File */}
              {!isReadOnly && (
                <>
                  <label
                    htmlFor="assignment-file"
                    className="
                      flex
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-xl
                      border-2
                      border-dashed
                      border-border
                      bg-background
                      px-6
                      py-8
                      text-center
                      transition
                      hover:border-primary
                      hover:bg-primary/5
                      sm:py-10
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-primary/10
                        text-primary
                        sm:h-12
                        sm:w-12
                      "
                    >
                      <Upload size={22} />
                    </div>

                    <p className="mt-4 text-sm font-medium text-text-primary">
                      Click to upload a file
                    </p>

                    <p className="mt-1 text-xs text-text-secondary">
                      Select your assignment file from your device.
                    </p>

                    <input
                      id="assignment-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={isSaving}
                    />
                  </label>

                  {/* Selected File */}
                  {file && (
                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-border
                        bg-surface
                        p-4
                      "
                    >
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-primary/10
                          text-primary
                        "
                      >
                        <FileText size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-text-primary">
                          {file.name}
                        </p>

                        <p className="mt-1 text-xs text-text-secondary">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <div className="border-b border-border p-4 sm:p-5">
              <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                Submission Summary
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                {isReadOnly
                  ? "Your current submission."
                  : "Review before submitting."}
              </p>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              {/* Answer Status */}
              <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                <CheckCircle2
                  size={20}
                  className={answer.trim() ? "text-success" : "text-text-muted"}
                />

                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary">
                    Answer
                  </p>

                  <p className="text-xs text-text-secondary">
                    {answer.trim() ? "Written" : "Not written yet"}
                  </p>
                </div>
              </div>

              {/* Submission Status */}
              {isSubmitted && (
                <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <CheckCircle2 size={20} className="text-success" />

                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Status
                    </p>

                    <p className="text-xs text-success">{submission.status}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-1">
                {/* New Submission */}
                {!isSubmitted && (
                  <Button
                    type="button"
                    disabled={!answer.trim() || isSaving}
                    onClick={handleSubmit}
                  >
                    {uploadFileMutation.isPending
                      ? "Uploading file..."
                      : createSubmissionMutation.isPending
                        ? "Submitting..."
                        : "Submit Assignment"}
                  </Button>
                )}

                {/* Existing Submission */}
                {isSubmitted && !isEditing && (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Resubmit Assignment
                  </Button>
                )}

                {/* Editing / Resubmitting */}
                {isSubmitted && isEditing && (
                  <>
                    <Button
                      type="button"
                      disabled={!answer.trim() || isSaving}
                      onClick={handleSubmit}
                    >
                      {uploadFileMutation.isPending
                        ? "Uploading file..."
                        : resubmitMutation.isPending
                          ? "Saving..."
                          : "Save Resubmission"}
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      disabled={isSaving}
                      onClick={() => {
                        setIsEditing(false);
                        setAnswer(submission.answer);
                        setFile(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}

                {/* Back */}
                {!isEditing && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Toast — replaces window.alert */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
