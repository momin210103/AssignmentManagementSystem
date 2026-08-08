import { Search } from "lucide-react";

import { useClasses } from "../../classes/hooks/useClasses";
import { useSubjects } from "../../subjects/hooks/useSubjects";
import { useTeachers } from "../../teachers/hooks/useTeachers";

type AssignmentToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  teacherId: string;
  onTeacherChange: (value: string) => void;

  classId: string;
  onClassChange: (value: string) => void;

  subjectId: string;
  onSubjectChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;
};

export default function AssignmentToolbar({
  search,
  onSearchChange,
  teacherId,
  onTeacherChange,
  classId,
  onClassChange,
  subjectId,
  onSubjectChange,
  status,
  onStatusChange
}: AssignmentToolbarProps) {
  const { data: teachers = [], isLoading: teachersLoading } = useTeachers();

  const { data: classes = [], isLoading: classesLoading } = useClasses();

  const { data: subjects = [], isLoading: subjectsLoading } = useSubjects();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Assignments</h1>

        <p className="mt-1 text-text-secondary">
          View assignments given by teachers.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-text-muted
            "
          />

          <input
            type="text"
            value={search}
            placeholder="Search assignment..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-input-border
              bg-surface
              pl-11
              pr-4
              text-sm
              text-text-primary
              outline-none
              focus:border-primary
            "
          />
        </div>

        {/* Teacher Filter */}
        <select
          value={teacherId}
          onChange={(e) => onTeacherChange(e.target.value)}
          className="
            h-11
            min-w-48
            rounded-xl
            border
            border-input-border
            bg-surface
            px-3
            text-sm
            text-text-primary
            outline-none
            focus:border-primary
          "
        >
          <option value="">
            {teachersLoading ? "Loading teachers..." : "All Teachers"}
          </option>

          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.fullName}
            </option>
          ))}
        </select>

        {/* Class Filter */}
        <select
          value={classId}
          onChange={(e) => onClassChange(e.target.value)}
          className="
            h-11
            min-w-48
            rounded-xl
            border
            border-input-border
            bg-surface
            px-3
            text-sm
            text-text-primary
            outline-none
            focus:border-primary
          "
        >
          <option value="">
            {classesLoading ? "Loading classes..." : "All Classes"}
          </option>

          {classes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - Section {item.section}
            </option>
          ))}
        </select>

        {/* Subject Filter */}
        <select
          value={subjectId}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="
            h-11
            min-w-48
            rounded-xl
            border
            border-input-border
            bg-surface
            px-3
            text-sm
            text-text-primary
            outline-none
            focus:border-primary
          "
        >
          <option value="">
            {subjectsLoading ? "Loading subjects..." : "All Subjects"}
          </option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="
            h-11
            min-w-48
            rounded-xl
            border
            border-input-border
            bg-surface
            px-3
            text-sm
            text-text-primary
            outline-none
            focus:border-primary
          "
        >
          <option value="">All Statuses</option>
          <option value="1">Published</option>
          <option value="0">Draft</option>
        </select>
      </div>
    </div>
  );
}   