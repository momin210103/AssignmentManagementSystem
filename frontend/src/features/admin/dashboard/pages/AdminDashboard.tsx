import { BookOpen, ClipboardList, GraduationCap, Users } from "lucide-react";

import StatCard from "../components/StatCard";
import RecentAssignments from "../components/RecentAssignments";
import RecentStudents from "../components/RecentStudents";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-primary">
          Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-extrabold text-text-primary">
          Welcome Back, Admin
        </h1>
      </div>

      {/* Stats */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Students" value="125" icon={<Users size={18} />} />

        <StatCard
          title="Teachers"
          value="18"
          icon={<GraduationCap size={18} />}
        />

        <StatCard title="Subjects" value="15" icon={<BookOpen size={18} />} />

        <StatCard
          title="Assignments"
          value="42"
          icon={<ClipboardList size={18} />}
        />
      </section>

      {/* Content */}
      <section className="relative grid gap-6 xl:grid-cols-2">
        <RecentAssignments />

        <RecentStudents />

        {/* <FloatingCard /> */}
      </section>
    </div>
  );
}
