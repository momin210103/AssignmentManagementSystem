import { BookOpen, ClipboardList, GraduationCap, Users } from "lucide-react";

import StatCard from "../components/StatCard";
import { useDashboardSummary } from "../hooks/useDashboardSummary";

export default function AdminDashboard() {
  const { data: summary } = useDashboardSummary();
  console.log("summary", summary);
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Dashboard
        </p>

        <h1 className="mt-2 text-2xl font-extrabold text-text-primary sm:text-4xl">
          Welcome Back, Admin
        </h1>

        <p className="mt-2 text-sm text-text-secondary">
          Manage your academy from one place.
        </p>
      </div>

      {/* Academy stats */}
      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
          Academy
        </p>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            title="Students"
            value={summary?.totalStudents.toString() || "0"}
            icon={<Users size={18} />}
          />

          <StatCard
            title="Teachers"
            value={summary?.totalTeachers || "0"}
            icon={<GraduationCap size={18} />}
          />

          <StatCard
            title="Classes"
            value={summary?.totalClasses || "0"}
            icon={<BookOpen size={18} />}
          />

          <StatCard
            title="Subjects"
            value={summary?.totalSubjects || "0"}
            icon={<BookOpen size={18} />}
          />
        </div>
      </section>

      {/* Activity stats */}
      <section>
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-text-secondary">
          Activity
        </p>

        <div className="grid grid-cols-2 gap-4 sm:max-w-md">
          <StatCard
            title="Assignments"
            value={summary?.totalAssingments || "0"}
            icon={<ClipboardList size={18} />}
          />

          <StatCard
            title="Submissions"
            value={summary?.totalSubmissions || "0"}
            icon={<ClipboardList size={18} />}
          />
        </div>
      </section>

      
    </div>
  );
}
