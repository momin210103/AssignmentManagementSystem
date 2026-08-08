import { useState } from "react";

import SubjectTable from "../components/SubjectTable";
import SubjectToolbar from "../components/SubjectToolbar";

export default function SubjectListPage() {
  const [search, setSearch] = useState("");

  const handleAddSubject = () => {
    console.log("Open Add Subject Modal");
  };

  return (
    <div className="space-y-6">
      <SubjectToolbar
        search={search}
        onSearchChange={setSearch}
        onAddSubject={handleAddSubject}
      />

      <SubjectTable search={search} />
    </div>
  );
}
