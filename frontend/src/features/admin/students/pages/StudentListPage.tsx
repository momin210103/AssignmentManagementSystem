import { useState } from "react";

import Modal from "@/components/ui/Modal";

import StudentTable from "@/features/admin/students/components/StudentTable";
import StudentToolbar from "@/features/admin/students/components/StudentToolbar";
import StudentForm from "../components/StudentForm";

export default function StudentListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <StudentToolbar
        search={search}
        onSearchChange={setSearch}
        onAddStudent={() => setOpen(true)}
      />

      <StudentTable search={search} />

      <Modal isOpen={open} title="Add Student" onClose={() => setOpen(false)}>
        <p className="text-text-secondary">Student Form Here...</p>
        <StudentForm />
      </Modal>
    </div>
  );
}
