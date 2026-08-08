import { useState } from "react";

import AssignmentTable from "../components/AssignmentTable";
import AssignmentToolbar from "../components/AssignmentToolbar";

export default function AssignmentListPage() {
  const [search, setSearch] = useState("");

  const [teacherId, setTeacherId] = useState("");
  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="space-y-6">
      <AssignmentToolbar
        search={search}
        onSearchChange={setSearch}
        teacherId={teacherId}
        onTeacherChange={setTeacherId}
        classId={classId}
        onClassChange={setClassId}
        subjectId={subjectId}
        onSubjectChange={setSubjectId}
        status={status}
        onStatusChange={setStatus}
      />

      <AssignmentTable
        search={search}
        teacherId={teacherId}
        classId={classId}
        subjectId={subjectId}
        status={status}
      />
    </div>
  );
}
