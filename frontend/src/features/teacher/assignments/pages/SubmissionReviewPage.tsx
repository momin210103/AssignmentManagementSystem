import { ArrowLeft, FileText } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useGradeSubmission } from "../hooks/useGradeSubmission";
import type { AssignmentSubmission } from "../types/submission";

type LocationState = {
  submission?: AssignmentSubmission;
};

export default function SubmissionReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { submission } = (location.state as LocationState) ?? {};

  const [marks, setMarks] = useState(submission?.marks?.toString() ?? "");
  const [feedback, setFeedback] = useState(submission?.feedback ?? "");

  const gradeMutation = useGradeSubmission();

  if (!submission) {
    return (
      <Card>
        <div className="py-10 text-center">
          <p className="text-text-secondary">Submission data not found.</p>

          <Button type="button" className="mt-4" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </Card>
    );
  }

  const handleGradeSubmit = () => {
    const numericMarks = Number(marks);

    if (!marks.trim() || Number.isNaN(numericMarks)) {
      return;
    }

    gradeMutation.mutate(
      {
        submissionId: submission.id,
        data: {
          marks: numericMarks,
          feedback: feedback.trim(),
        },
      },
      {
        onSuccess: () => {
          window.alert("Submission graded successfully.");
          navigate(`/teacher/assignments/${submission.assignmentId}/submissions`);
        },
      },
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full border border-border text-text-secondary
              transition hover:bg-primary/10 hover:text-primary
            "
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Review Submission
            </h1>

            <p className="mt-0.5 text-sm text-text-secondary">
              {submission.studentId} · submitted{" "}
              {new Date(submission.submittedAt).toLocaleString()}
            </p>
          </div>
        </div>

        <span
          className="
            inline-flex w-fit items-center rounded-full bg-primary/10
            px-3 py-1 text-xs font-semibold text-primary
          "
        >
          {submission.status}
        </span>
      </div>

      {/* Content + grading panel */}
      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {/* Left: submission content */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <div className="border-b border-border p-5">
              <h2 className="text-lg font-semibold text-text-primary">
                Student Answer
              </h2>
            </div>

            <div className="p-5">
              <div
                className="
                  min-h-32 whitespace-pre-wrap rounded-xl border
                  border-border bg-background p-4 text-sm leading-6
                  text-text-primary
                "
              >
                {submission.answer || "No answer provided."}
              </div>
            </div>
          </Card>

          <Card>
            <div className="border-b border-border p-5">
              <h2 className="text-lg font-semibold text-text-primary">
                Submitted File
              </h2>
            </div>

            <div className="p-5">
              {submission.fileUrl ? (
                <a
                  href={submission.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2 rounded-lg border
                    border-border px-4 py-2 text-sm font-medium text-primary
                    transition hover:bg-primary/10
                  "
                >
                  <FileText size={17} />
                  View Submitted File
                </a>
              ) : (
                <p className="text-sm text-text-muted">No file submitted.</p>
              )}
            </div>
          </Card>

          {/* Compact info strip instead of a separate stacked card */}
          <Card>
            <div className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Student ID
                </p>
                <p className="mt-1 font-medium text-text-primary">
                  {submission.studentId}
                </p>
              </div>

              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Submitted At
                </p>
                <p className="mt-1 font-medium text-text-primary">
                  {new Date(submission.submittedAt).toLocaleString()}
                </p>
              </div>

              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Status
                </p>
                <span className="mt-1 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {submission.status}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: sticky grading panel */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <div className="border-b border-border p-5">
              <h2 className="text-lg font-semibold text-text-primary">
                Grade Submission
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Provide marks and feedback for this submission.
              </p>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <label
                  htmlFor="marks"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Marks
                </label>

                <input
                  id="marks"
                  type="number"
                  min={0}
                  value={marks}
                  onChange={(event) => setMarks(event.target.value)}
                  placeholder="Enter marks"
                  className="
                    h-11 w-full rounded-xl border border-input-border
                    bg-surface px-4 text-sm text-text-primary outline-none
                    transition focus:border-primary
                  "
                />
              </div>

              <div>
                <label
                  htmlFor="feedback"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Feedback
                </label>

                <textarea
                  id="feedback"
                  rows={6}
                  value={feedback}
                  onChange={(event) => setFeedback(event.target.value)}
                  placeholder="Write feedback for the student..."
                  className="
                    w-full resize-none rounded-xl border border-input-border
                    bg-surface p-4 text-sm text-text-primary outline-none
                    transition focus:border-primary
                  "
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  disabled={gradeMutation.isPending}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>

                <Button
                  type="button"
                  disabled={gradeMutation.isPending || marks.trim() === ""}
                  onClick={handleGradeSubmit}
                >
                  {gradeMutation.isPending ? "Saving..." : "Save Grade"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
