import SubmissionTable from "../components/SubmissionTable";

export default function AllSubmissionsListPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Submissions
        </p>

        <h1 className="mt-2 text-2xl font-bold text-text-primary sm:text-3xl">
          Student Submissions
        </h1>

        <p className="mt-1 text-sm text-text-secondary">
          View all assignment submissions from students.
        </p>
      </div>

      {/* Table */}
      <SubmissionTable />
    </div>
  );
}
