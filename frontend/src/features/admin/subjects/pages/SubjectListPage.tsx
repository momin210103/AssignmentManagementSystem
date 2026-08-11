import { useState } from "react";

import SubjectTable from "../components/SubjectTable";
import SubjectToolbar from "../components/SubjectToolbar";
import Modal from "@/components/ui/Modal";
import SubjectForm from "../components/SubjectForm";
import Toast from "@/components/ui/Toast";

export default function SubjectListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSuccess = () => {
    setOpen(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <SubjectToolbar
        search={search}
        onSearchChange={setSearch}
        onAddSubject={() => setOpen(true)}
      />

      <SubjectTable search={search} />
      <Modal isOpen={open} title="Add Subject" onClose={handleClose}>
        <SubjectForm onSuccess={handleSuccess} onCancel={handleClose} />
      </Modal>
      {showSuccess && (
        <Toast message="Subject added successfully!" />
      )}
    </div>
  );
}
