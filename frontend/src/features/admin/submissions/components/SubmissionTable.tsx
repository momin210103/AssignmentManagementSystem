import Card from "@/components/ui/Card";

import { useGetAllSubmissions } from "../hooks/useGetAllSubmissions";

export default function SubmissionTable() {
  const { data: submissions = [], isLoading, isError } = useGetAllSubmissions();
  console.log("submissions", submissions);

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "Submitted";

      case 1:
        return "Reviewed";

      case 2:
        return "Late";

      default:
        return "Unknown";
    }
  };

  const getStatusClass = (status: number) => {
    switch (status) {
      case 0:
        return "bg-warning/10 text-warning";

      case 1:
        return "bg-success/10 text-success";

      case 2:
        return "bg-danger/10 text-danger";

      default:
        return "bg-background text-text-secondary";
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-text-secondary">
          Loading submissions...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="text-center text-sm text-danger">
          Failed to load submissions.
        </p>
      </Card>
    );
  }

  if (submissions.length === 0) {
    return (
      <Card className="p-6">
        <p className="py-8 text-center text-sm text-text-muted">
          No submissions found.
        </p>
      </Card>
    );
  }

  return (
    <>
      {/* Desktop / Tablet */}
      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr className="border-b border-border">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  #
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Student
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Assignment
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Subject
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Class
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Submitted
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Marks
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((submission, index) => (
                <tr
                  key={submission.id}
                  className="
                    border-b
                    border-border
                    last:border-b-0
                    transition
                    hover:bg-background
                  "
                >
                  <td className="px-5 py-4 text-sm text-text-muted">
                    {index + 1}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-text-primary">
                      {submission.studentName}
                    </p>
                  </td>

                  <td className="max-w-60 px-5 py-4">
                    <p className="truncate text-sm text-text-primary">
                      {submission.assignmentTitle}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-text-secondary">
                    {submission.subjectName}
                  </td>

                  <td className="px-5 py-4 text-sm text-text-secondary">
                    {submission.className}
                  </td>

                  <td className="px-5 py-4 text-sm text-text-secondary">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4 text-center text-sm font-medium text-text-primary">
                    {submission.marks ?? "-"}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getStatusClass(submission.status)}
                        `}
                    >
                      {getStatusLabel(submission.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {submissions.map((submission) => (
          <Card key={submission.id} className="overflow-hidden">
            <div className="p-4">
              {/* Student + Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-text-primary">
                    {submission.studentName}
                  </h3>

                  <p className="mt-1 truncate text-sm text-text-secondary">
                    {submission.assignmentTitle}
                  </p>
                </div>

                <span
                  className={`
                    shrink-0
                    rounded-full
                    px-2.5
                    py-1
                    text-[11px]
                    font-semibold
                    ${getStatusClass(submission.status)}
                `}
                >
                  {getStatusLabel(submission.status)}
                </span>
              </div>

              {/* Details */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-muted">Subject</p>

                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {submission.subjectName}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-text-muted">Class</p>

                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {submission.className}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-text-muted">Submitted</p>

                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {new Date(submission.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-text-muted">Marks</p>

                  <p className="mt-1 text-sm font-medium text-text-primary">
                    {submission.marks ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
