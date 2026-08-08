import { useState } from "react";

import Modal from "@/components/ui/Modal";

import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";
import TeacherToolbar from "../components/TeacherToolbar";
import type { Teacher } from "../types/teacher";

export default function TeacherListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>();

  const handleAddTeacher = () => {
    setSelectedTeacher(undefined);
    setOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTeacher(undefined);
  };

  return (
    <div className="space-y-6">
      <TeacherToolbar
        search={search}
        onSearchChange={setSearch}
        onAddTeacher={handleAddTeacher}
      />

      <TeacherTable search={search} onEditTeacher={handleEditTeacher} />

      <Modal
        isOpen={open}
        title={selectedTeacher ? "Edit Teacher" : "Add Teacher"}
        onClose={handleClose}
      >
        <TeacherForm
          teacher={selectedTeacher}
          onSuccess={handleClose}
          onCancel={handleClose}
        />
      </Modal>
    </div>
  );
}
