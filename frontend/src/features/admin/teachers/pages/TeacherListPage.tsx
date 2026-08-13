import { useState } from "react";

import Modal from "@/components/ui/Modal";
import Toast from "@/components/ui/Toast";

import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";
import TeacherToolbar from "../components/TeacherToolbar";

export default function TeacherListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddTeacher = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    setOpen(false);
    setToastMessage("Teacher saved successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <TeacherToolbar
        search={search}
        onSearchChange={setSearch}
        onAddTeacher={handleAddTeacher}
      />

      <TeacherTable search={search} />

      <Modal
        isOpen={open}
        title="Add Teacher"
        onClose={handleClose}
      >
        <TeacherForm
          onSuccess={handleSuccess}
          onCancel={handleClose}
        />
      </Modal>
      {toastMessage && <Toast message={toastMessage} type="success" />}
    </div>
  );
}
