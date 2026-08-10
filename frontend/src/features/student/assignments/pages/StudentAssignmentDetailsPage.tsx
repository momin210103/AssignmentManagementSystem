import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

import { useAssignmentById } from "@/features/admin/assignments/hooks/useAssignmentById";

export default function StudentAssignmentDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: assignment, isLoading, isError } = useAssignmentById(id ?? "");

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
            className="mt-4 w-full sm:w-auto"
            onClick={() => navigate("/student/assignments")}
          >
            Back to Assignments
          </Button>
        </div>
      </Card>
    );
  }

  const deadline = new Date(assignment.deadline);

  return (
    <div className="mx-auto max-w-8xl space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/student/assignments")}
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
              Review the assignment before submitting your work.
            </p>
          </div>
        </div>
      </div>

      {/* Content: single column up to lg, then 1/3 sidebar + 2/3 main */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 lg:items-start">
        {/* Left — compact info sidebar on large screens */}
        <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-6 lg:col-span-1">
          <Card>
            <div className="p-4 sm:p-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12">
                  <ClipboardList size={22} className="sm:hidden" />
                  <ClipboardList size={24} className="hidden sm:block" />
                </div>

                <div className="min-w-0">
                  <h2 className="break-words text-lg font-semibold text-text-primary sm:text-xl">
                    {assignment.title}
                  </h2>

                  <span className="mt-2 inline-flex rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                    {assignment.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <p className="text-sm text-text-secondary">Maximum Marks</p>

                <p className="text-xl font-bold text-text-primary">
                  {assignment.maximumMarks}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="divide-y divide-border">
              <div className="flex items-center gap-3 p-4 sm:p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-10 sm:w-10">
                  <GraduationCap size={18} className="sm:hidden" />
                  <GraduationCap size={20} className="hidden sm:block" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-text-secondary">
                    Teacher
                  </p>

                  <p className="mt-1 truncate font-semibold text-text-primary">
                    {assignment.teacherName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 sm:p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary sm:h-10 sm:w-10">
                  <GraduationCap size={18} className="sm:hidden" />
                  <GraduationCap size={20} className="hidden sm:block" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium text-text-secondary">
                    Class
                  </p>

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
                  <p className="text-xs font-medium text-text-secondary">
                    Subject
                  </p>

                  <p className="mt-1 truncate font-semibold text-text-primary">
                    {assignment.subjectName}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-5">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/10 text-warning sm:h-11 sm:w-11">
                <CalendarDays size={20} className="sm:hidden" />
                <CalendarDays size={22} className="hidden sm:block" />
              </div>

              <div>
                <p className="text-sm text-text-secondary">
                  Submission Deadline
                </p>

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
        </div>

        {/* Right — description gets the wide column on large screens */}
        <div className="space-y-4 sm:space-y-6 lg:col-span-2">
          <Card>
            <div className="border-b border-border p-4 sm:p-5">
              <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                Assignment Description
              </h2>
            </div>

            <div className="p-4 sm:p-5">
              <div className="min-h-40 whitespace-pre-wrap rounded-xl border border-border bg-background p-4 text-sm leading-6 text-text-secondary sm:min-h-64 sm:p-5 sm:leading-7">
                {assignment.description || "No description provided."}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-base font-semibold text-text-primary sm:text-lg">
                  Ready to submit?
                </h2>

                <p className="mt-1 text-sm text-text-secondary">
                  Submit your answer before the deadline.
                </p>
              </div>

              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() =>
                  navigate(`/student/assignments/${assignment.id}/submit`)
                }
              >
                Submit Assignment
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
