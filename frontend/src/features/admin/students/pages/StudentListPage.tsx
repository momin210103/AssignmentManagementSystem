import { useState } from "react";

import Modal from "@/components/ui/Modal";

import StudentTable from "@/features/admin/students/components/StudentTable";
import StudentToolbar from "@/features/admin/students/components/StudentToolbar";
import StudentForm from "../components/StudentForm";
import type {Student } from "../services/studentApi";

export default function StudentListPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();

  const handleEditStudent = (student : Student) =>{
    setSelectedStudent(student);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setSelectedStudent(undefined);
  };
  return (
    <div className="space-y-6">
      <StudentToolbar
        search={search}
        onSearchChange={setSearch}
        onAddStudent={() => setOpen(true)}
      />

      <StudentTable 
      search={search} 
      onEditStudent={handleEditStudent}
      />

      <Modal 
      isOpen={open} 
      title={
          selectedStudent
            ? "Edit Student"
            : "Add Student"
        }
      onClose={handleClose}>
        <StudentForm 
        student={selectedStudent}
          onSuccess={handleClose}
          onCancel={handleClose}
        />
      </Modal>
    </div>
  );
}
