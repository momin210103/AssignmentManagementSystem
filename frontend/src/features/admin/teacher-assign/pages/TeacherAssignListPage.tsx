import { useState } from "react";
import TeacherAssignToolbar from "../components/TeacherAssignToolbar";
import TeacherAssignTable from "../components/TeacherAssignTable";


export default function TeacherAssignListPage() {
    const [search, setSearch] = useState("");
    const handleAssignTeacher = () =>{
        console.log("Assign Teacher button clicked");

    };
    return (
    <div className="space-y-6">
      <TeacherAssignToolbar
        search={search}
        onSearchChange={setSearch}
        onAssignTeacher={handleAssignTeacher}
      />

      <TeacherAssignTable search={search} />
    </div>
  );
}