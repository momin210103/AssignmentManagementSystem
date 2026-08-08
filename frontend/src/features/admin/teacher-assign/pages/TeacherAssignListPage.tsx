import { useState } from "react";
import TeacherAssignToolbar from "../components/TeacherAssignToolbar";
import TeacherAssignTable from "../components/TeacherAssignTable";
import Modal from "@/components/ui/Modal";
import TeacherAssignForm from "../components/TeacherAssignForm";


export default function TeacherAssignListPage() {
    const [search, setSearch] = useState("");
    const [open,setOpen] = useState(false);

    const handleAssignTeacher = () =>{
        console.log("Assign Teacher button clicked");
        setOpen(true);

    };
    const handleClose = () => {
        setOpen(false);
    }
    return (
    <div className="space-y-6">
      <TeacherAssignToolbar
        search={search}
        onSearchChange={setSearch}
        onAssignTeacher={handleAssignTeacher}
      />

      <TeacherAssignTable search={search} />
      <Modal
        isOpen={open}
        title="Assign Teacher"
        onClose = {handleClose}
        >
          <TeacherAssignForm
            onSuccess={handleClose}
            onCancel={handleClose}
          />

      </Modal>
    </div>
  );
}