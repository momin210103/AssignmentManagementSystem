import { useState } from "react";

import Modal from "@/components/ui/Modal";
import Toast from "@/components/ui/Toast";

import StudentTable from "@/features/admin/students/components/StudentTable";
import StudentToolbar from "@/features/admin/students/components/StudentToolbar";
import StudentForm from "../components/StudentForm";
import type { Student } from "../services/studentApi";

export default function StudentListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(undefined);
  };

  const handleSuccess = () => {
    setOpen(false);
    setSelectedStudent(undefined);
    setToastMessage("Student saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <StudentToolbar
        search={search}
        onSearchChange={setSearch}
        onAddStudent={() => setOpen(true)}
      />

      <StudentTable search={search} />

      <Modal
        isOpen={open}
        title={selectedStudent ? "Edit Student" : "Add Student"}
        onClose={handleClose}
      >
        <StudentForm
          student={selectedStudent}
          onSuccess={handleSuccess}
          onCancel={handleClose}
        />
      </Modal>
      {toastMessage && <Toast message={toastMessage} type="success" />}
    </div>
  );
}
