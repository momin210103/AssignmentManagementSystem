import { ArrowRight, User } from "lucide-react";

import Card from "@/components/ui/Card";

const students = [
  {
    id: 1,
    name: "Ariful Islam",
    class: "Class IX - Science",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    class: "Class X - Commerce",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    class: "Class XI - Humanities",
  },
];

export default function RecentStudents() {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">
            Recent
          </p>

          <h2 className="mt-1 text-xl font-bold text-text-primary">Students</h2>
        </div>

        <button className="flex items-center gap-1 text-sm font-semibold text-primary">
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-border
              p-4
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-text-white
                "
              >
                <User size={18} />
              </div>

              <div>
                <h3 className="font-semibold text-text-primary">
                  {student.name}
                </h3>

                <p className="text-sm text-text-secondary">{student.class}</p>
              </div>
            </div>

            <button className="text-sm font-semibold text-primary hover:underline">
              Details
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
