import { useState } from "react";

import Modal from "@/components/ui/Modal";

import ClassToolbar from "../components/ClassToolbar";
import ClassTable from "../components/ClassTable";
import ClassForm from "../components/ClassForm";


export default function ClassListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
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
        <ClassForm onSuccess={handleClose} onCancel={handleClose} />
      </Modal>
    </div>
  );
}
