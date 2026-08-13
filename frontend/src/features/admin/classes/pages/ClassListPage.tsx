import { useState } from "react";

import Modal from "@/components/ui/Modal";
import Toast from "@/components/ui/Toast";

import ClassToolbar from "../components/ClassToolbar";
import ClassTable from "../components/ClassTable";
import ClassForm from "../components/ClassForm";

export default function ClassListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    setOpen(false);
    setToastMessage("Class created successfully!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      <ClassToolbar
        search={search}
        onSearchChange={setSearch}
        onAddClass={() => setOpen(true)}
      />

      <ClassTable search={search} />

      <Modal isOpen={open} title="Add Class" onClose={handleClose}>
        <ClassForm onSuccess={handleSuccess} onCancel={handleClose} />
      </Modal>
      {toastMessage && <Toast message={toastMessage} type="success" />}
    </div>
  );
}
