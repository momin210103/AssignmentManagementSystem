import { Plus } from "lucide-react";
import { useState } from "react";

import Button from "@/components/ui/Button";

import AssignmentTable from "../components/TeacherAssignmentTable";
import AssignmentToolbar from "../components/TeacherAssignmentToolbar";
import { useNavigate } from "react-router-dom";

export default function AssignmentListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            My Assignments
          </h1>

          <p className="mt-1 text-text-secondary">
            Manage assignments created by you.
          </p>
        </div>

        <Button
          type="button"
          leftIcon={<Plus size={18} />}
          onClick={() => navigate("/teacher/assignments/create")}
        >
          Create Assignment
        </Button>
      </div>

      {/* Toolbar */}
      <AssignmentToolbar
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {/* Table */}
      <AssignmentTable search={search} status={status} />
    </div>
  );
}
