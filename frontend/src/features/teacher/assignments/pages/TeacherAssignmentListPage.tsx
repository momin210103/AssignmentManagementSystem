import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/ui/Button";

import AssignmentTable from "../components/TeacherAssignmentTable";
import AssignmentToolbar from "../components/TeacherAssignmentToolbar";
import { useTeacherAssignments } from "../hooks/useTeacherAssignment";

export default function TeacherAssignmentListPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const {
    data: assignments = [],
    isLoading,
    isError,
  } = useTeacherAssignments();

  const filteredAssignments = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return assignments.filter((assignment) => {
      const matchesSearch =
        !searchValue ||
        assignment.title.toLowerCase().includes(searchValue) ||
        assignment.description.toLowerCase().includes(searchValue);

      const matchesStatus = !status || assignment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [assignments, search, status]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
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
      <AssignmentTable
        assignments={filteredAssignments}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
