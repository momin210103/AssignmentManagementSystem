import { useState } from "react";

import SubjectTable from "../components/SubjectTable";
import SubjectToolbar from "../components/SubjectToolbar";
import Modal from "@/components/ui/Modal";
import SubjectForm from "../components/SubjectForm";

export default function SubjectListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
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
        <SubjectForm onSuccess={handleClose} onCancel={handleClose} />
      </Modal>
    </div>
  );
}
