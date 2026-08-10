import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useMySubmissionById } from "@/features/student/submissions/hooks/useSubmissionById";

export default function StudentSubmissionDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: submission,
    isLoading,
    isError,
  } = useMySubmissionById(id ?? "");

  if (isLoading) {
    return (
      <div className="mx-auto flex max-w-4xl items-center justify-center min-h-[400px]">
        <Card className="w-full p-8 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-sm font-medium text-text-secondary">
            Loading submission details...
          </p>
        </Card>
      </div>
    );
  }

  if (isError || !submission) {
    return (
      <div className="mx-auto max-w-lg pt-12">
        <Card className="p-6 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
            <FileText size={24} />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-text-primary">
            Submission Not Found
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            We couldn't retrieve this submission. It may have been removed or
            you may have followed an invalid link.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-6 w-full sm:w-auto"
            onClick={() => navigate("/student/submissions")}
          >
            Back to Submissions
          </Button>
        </Card>
      </div>
    );
  }

  const apiOrigin = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, "");
  const fileUrl = submission.fileUrl
    ? `${apiOrigin}${submission.fileUrl}`
    : null;
  const isGraded = submission.marks !== undefined && submission.marks !== null;

  return (
    <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 space-y-6">
      {/* Navigation Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/student/submissions")}
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border border-border bg-surface text-text-secondary
              shadow-sm transition-all hover:bg-primary/10 hover:text-primary hover:border-primary/30
              focus:outline-none focus:ring-2 focus:ring-primary/20
            "
            aria-label="Back to Submissions"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Submission Details
              </h1>
            </div>
            <p className="text-xs text-text-secondary sm:text-sm">
              Review your submission responses, attached files, and instructor
              feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Main Responsive Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Main Content Column (Left on Desktop: 8 Cols) */}
        <div className="space-y-6 lg:col-span-7 xl:col-span-8">
          {/* Answer Card */}
          <Card className="overflow-hidden border border-border shadow-sm">
            <div className="flex items-center justify-between border-b border-border bg-surface/50 px-5 py-4">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                <h2 className="font-semibold text-text-primary">
                  Your Submission Answer
                </h2>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="whitespace-pre-wrap rounded-xl border border-border/80 bg-background/50 p-4 sm:p-5 text-sm leading-relaxed text-text-primary min-h-[120px]">
                {submission.answer || (
                  <span className="italic text-text-muted">
                    No text response was submitted with this entry.
                  </span>
                )}
              </div>
            </div>
          </Card>

          {/* Feedback Card */}
          {submission.feedback ? (
            <Card className="overflow-hidden border border-primary/20 bg-primary/5 shadow-sm">
              <div className="flex items-center justify-between border-b border-primary/10 bg-primary/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" />
                  <h2 className="font-semibold text-primary">
                    Instructor Feedback
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="whitespace-pre-wrap rounded-xl border border-primary/20 bg-background/80 p-4 sm:p-5 text-sm leading-relaxed text-text-primary">
                  {submission.feedback}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="border border-dashed border-border bg-surface/30 p-6 text-center">
              <MessageSquare
                size={24}
                className="mx-auto text-text-muted mb-2"
              />
              <p className="text-sm font-medium text-text-secondary">
                No Feedback Provided Yet
              </p>
              <p className="text-xs text-text-muted mt-1">
                Your instructor hasn't added comments to this submission.
              </p>
            </Card>
          )}

          {/* Attached File Card (On Mobile/Tablet embedded in content order, desktop shown) */}
          <Card className="overflow-hidden border border-border shadow-sm">
            <div className="border-b border-border bg-surface/50 px-5 py-4">
              <h2 className="font-semibold text-text-primary">Attached File</h2>
            </div>

            <div className="p-5 sm:p-6">
              {fileUrl ? (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-surface p-4 transition-all hover:border-primary/50 hover:shadow-md">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText size={24} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">
                        Submitted File Attachment
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        Click to preview or download document
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        inline-flex items-center justify-center gap-1.5
                        rounded-lg bg-primary px-3 py-2 text-xs font-medium text-white
                        transition hover:bg-primary/90 shadow-sm w-full sm:w-auto
                      "
                    >
                      <span>View File</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-text-muted italic">
                  No attachment was uploaded with this submission.
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar Column (Right on Desktop: 4 Cols / Grid on Tablet) */}
        <div className="space-y-6 lg:col-span-5 xl:col-span-4 lg:sticky lg:top-6">
          {/* Status & Grade Overview */}
          <Card className="overflow-hidden border border-border shadow-sm">
            <div className="p-5 space-y-4">
              {/* Status Badge */}
              <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Status
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                  <CheckCircle2 size={14} />
                  {submission.status || "Submitted"}
                </span>
              </div>

              {/* Grade Highlight Display */}
              <div className="rounded-xl bg-surface/80 border border-border p-4 text-center">
                <span className="text-xs font-medium text-text-secondary block">
                  Grade / Score
                </span>
                <div className="mt-1 text-2xl font-bold text-text-primary">
                  {isGraded ? (
                    <span className="text-primary">{submission.marks}</span>
                  ) : (
                    <span className="text-text-muted text-base font-normal">
                      Pending Grade
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Submission Metadata Timeline */}
          <Card className="overflow-hidden border border-border shadow-sm">
            <div className="border-b border-border bg-surface/50 px-5 py-3.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Timeline & Details
              </h3>
            </div>

            <div className="divide-y divide-border text-sm">
              <div className="p-4 flex items-start gap-3">
                <Clock size={16} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-text-secondary">Submitted On</p>
                  <p className="mt-0.5 font-medium text-text-primary">
                    {new Date(submission.submittedAt).toLocaleString(
                      undefined,
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      },
                    )}
                  </p>
                </div>
              </div>

              <div className="p-4 flex items-start gap-3">
                <Calendar
                  size={16}
                  className="text-text-muted mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-xs text-text-secondary">Reviewed On</p>
                  <p className="mt-0.5 font-medium text-text-primary">
                    {submission.reviewedAt
                      ? new Date(submission.reviewedAt).toLocaleString(
                          undefined,
                          {
                            dateStyle: "medium",
                            timeStyle: "short",
                          },
                        )
                      : "Not reviewed yet"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
