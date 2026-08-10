import { ArrowLeft, CheckCircle2, FileText, Upload } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useCreateSubmission } from "../../submissions/hooks/useCreateSubmission";
import { useUploadSubmissionFile } from "@/features/student/submissions/hooks/useUploadSubmissionFile";

export default function StudentAssignmentSubmitPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const createSubmissionMutation = useCreateSubmission();
  const uploadFileMutation = useUploadSubmissionFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!id || !answer.trim()) {
      return;
    }

    try {
      let fileUrl: string | null = null;

      // Upload file only if selected
      if (file) {
        const uploadResult = await uploadFileMutation.mutateAsync(file);

        fileUrl = uploadResult.fileUrl;
      }

      // Create submission
      await createSubmissionMutation.mutateAsync({
        assignmentId: id,
        answer: answer.trim(),
        fileUrl,
      });

      window.alert("Assignment submitted successfully.");

      navigate(`/student/assignments/${id}`);
    } catch (error) {
      console.error("SUBMISSION ERROR:", error);

      window.alert("Failed to submit assignment.");
    }
  };

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
            Submit Assignment
          </h1>

          <p className="mt-0.5 text-xs text-text-secondary sm:text-sm">
            Submit your answer and file for this assignment.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:items-start">
        {/* Left — the actual work */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          {/* Answer */}
          <Card>
            <div className="border-b border-border p-4 sm:p-5">
              <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                Your Answer
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Write your answer below.
              </p>
            </div>

            <div className="p-4 sm:p-5">
              <textarea
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
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
                "
              />
            </div>
          </Card>

          {/* File Upload */}
          <Card>
            <div className="border-b border-border p-4 sm:p-5">
              <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                Submit File
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Upload your assignment file if required.
              </p>
            </div>

            <div className="p-4 sm:p-5">
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
                  <Upload size={22} className="sm:hidden" />
                  <Upload size={24} className="hidden sm:block" />
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
            </div>
          </Card>
        </div>

        {/* Right — sticky submission summary + actions */}
        <div className="lg:sticky lg:top-6">
          <Card>
            <div className="border-b border-border p-4 sm:p-5">
              <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                Submission Summary
              </h2>

              <p className="mt-1 text-sm text-text-secondary">
                Review before you submit.
              </p>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    color: answer.trim() ? undefined : undefined,
                  }}
                >
                  <CheckCircle2
                    size={20}
                    className={
                      answer.trim() ? "text-success" : "text-text-muted"
                    }
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary">
                    Answer
                  </p>

                  <p className="text-xs text-text-secondary">
                    {answer.trim() ? "Written" : "Not written yet"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                <CheckCircle2
                  size={20}
                  className={file ? "text-success" : "text-text-muted"}
                />

                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-primary">File</p>

                  <p className="truncate text-xs text-text-secondary">
                    {file ? file.name : "No file attached"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-1">
                <Button
                  type="button"
                  disabled={
                    !answer.trim() ||
                    createSubmissionMutation.isPending ||
                    uploadFileMutation.isPending
                  }
                  onClick={handleSubmit}
                >
                  {uploadFileMutation.isPending
                    ? "Uploading file..."
                    : createSubmissionMutation.isPending
                      ? "Submitting..."
                      : "Submit Assignment"}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
