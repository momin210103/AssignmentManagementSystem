import { useState } from "react";

import Modal from "@/components/ui/Modal";

import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";
import TeacherToolbar from "../components/TeacherToolbar";

export default function TeacherListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddTeacher = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <TeacherToolbar
        search={search}
        onSearchChange={setSearch}
        onAddTeacher={handleAddTeacher}
      />

      <TeacherTable search={search} />

      <Modal isOpen={open} title="Add Teacher" onClose={handleClose}>
        <TeacherForm onSuccess={handleClose} onCancel={handleClose} />
      </Modal>
    </div>
  );
}
