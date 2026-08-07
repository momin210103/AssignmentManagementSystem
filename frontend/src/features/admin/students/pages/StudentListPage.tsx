import { useState } from "react";

import StudentTable from "@/features/admin/students/components/StudentTable";
import StudentToolbar from "../components/StudentToolbar";

export default function StudentListPage() {
  const [search, setSearch] = useState("");

  const handleAddStudent = () => {
    console.log("Open Add Student Modal");
  };

  return (
    <div className="space-y-6">
      <StudentToolbar
        search={search}
        onSearchChange={setSearch}
        onAddStudent={handleAddStudent}
      />

      <StudentTable search={search} />
    </div>
  );
}
