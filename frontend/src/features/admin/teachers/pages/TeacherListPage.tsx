import { useState } from "react";

import TeacherTable from "../components/TeacherTable";
import TeacherToolbar from "../components/TeacherToolbar";

export default function TeacherListPage() {
  const [search, setSearch] = useState("");

  const handleAddTeacher = () => {
    console.log("Open Add Teacher Modal");
  };

  return (
    <div className="space-y-6">
      <TeacherToolbar
        search={search}
        onSearchChange={setSearch}
        onAddTeacher={handleAddTeacher}
      />

      <TeacherTable search={search} />
    </div>
  );
}
