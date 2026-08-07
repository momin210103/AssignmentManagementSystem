import { Eye, Pencil, Trash2 } from "lucide-react";

import Card from "@/components/ui/Card";

type StudentTableProps = {
  search: string;
};

const students = [
  {
    id: 1,
    fullName: "Ariful Islam",
    email: "ariful@gmail.com",
    department: "CSE",
    semester: "8th",
    status: "Active",
  },
  {
    id: 2,
    fullName: "Nusrat Jahan",
    email: "nusrat@gmail.com",
    department: "EEE",
    semester: "6th",
    status: "Active",
  },
  {
    id: 3,
    fullName: "Tanvir Ahmed",
    email: "tanvir@gmail.com",
    department: "BBA",
    semester: "4th",
    status: "Inactive",
  },
];

export default function StudentTable({ search }: StudentTableProps) {
  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Card className="overflow-hidden">
      <table className="w-full">
        <thead className="bg-background">
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Department
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Semester
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map((student) => (
            <tr
              key={student.id}
              className="border-b border-border hover:bg-background"
            >
              <td className="px-6 py-4 font-medium text-text-primary">
                {student.fullName}
              </td>

              <td className="px-6 py-4 text-text-secondary">{student.email}</td>

              <td className="px-6 py-4 text-text-secondary">
                {student.department}
              </td>

              <td className="px-6 py-4 text-text-secondary">
                {student.semester}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    student.status === "Active"
                      ? "bg-success/10 text-success"
                      : "bg-danger/10 text-danger"
                  }`}
                >
                  {student.status}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button className="text-primary hover:opacity-80">
                    <Eye size={18} />
                  </button>

                  <button className="text-warning hover:opacity-80">
                    <Pencil size={18} />
                  </button>

                  <button className="text-danger hover:opacity-80">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {filteredStudents.length === 0 && (
            <tr>
              <td colSpan={6} className="py-12 text-center text-text-muted">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
