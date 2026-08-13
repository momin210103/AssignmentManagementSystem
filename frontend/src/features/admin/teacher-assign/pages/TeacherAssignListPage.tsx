import { useState } from "react";
import TeacherAssignToolbar from "../components/TeacherAssignToolbar";
import TeacherAssignTable from "../components/TeacherAssignTable";
import Modal from "@/components/ui/Modal";
import TeacherAssignForm from "../components/TeacherAssignForm";
import Toast from "@/components/ui/Toast";

export default function TeacherAssignListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAssignTeacher = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    setOpen(false);
    setToastMessage("Teacher assigned successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <TeacherAssignToolbar
        search={search}
        onSearchChange={setSearch}
        onAssignTeacher={handleAssignTeacher}
      />

      <TeacherAssignTable search={search} />
      <Modal isOpen={open} title="Assign Teacher" onClose={handleClose}>
        <TeacherAssignForm
          onSuccess={handleSuccess}
          onCancel={handleClose}
        />
      </Modal>
      {toastMessage && <Toast message={toastMessage} type="success" />}
    </div>
  );
}