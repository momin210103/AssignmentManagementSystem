import { useState } from "react";

import AssignmentTable from "../components/AssignmentTable";
import AssignmentToolbar from "../components/AssignmentToolbar";

export default function AssignmentListPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <AssignmentToolbar search={search} onSearchChange={setSearch} />

      <AssignmentTable search={search} />
    </div>
  );
}
