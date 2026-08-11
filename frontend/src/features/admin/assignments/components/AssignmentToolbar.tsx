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
  onStatusChange,
}: AssignmentToolbarProps) {
  const { data: teachers = [], isLoading: teachersLoading } = useTeachers();

  const { data: classes = [], isLoading: classesLoading } = useClasses();

  const { data: subjects = [], isLoading: subjectsLoading } = useSubjects();

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
          Assignments
        </h1>

        <p className="mt-1 text-sm text-text-secondary sm:text-base">
          View assignments given by teachers.
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">
        {/* Search */}
        <div className="relative sm:col-span-2 lg:w-72">
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
              transition
              focus:border-primary
            "
          />
        </div>

        {/* Teacher */}
        <select
          value={teacherId}
          onChange={(e) => onTeacherChange(e.target.value)}
          className="
            h-11
            w-full
            rounded-xl
            border
            border-input-border
            bg-surface
            px-3
            text-sm
            text-text-primary
            outline-none
            transition
            focus:border-primary
            lg:w-48
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

        {/* Class */}
        <select
          value={classId}
          onChange={(e) => onClassChange(e.target.value)}
          className="
            h-11
            w-full
            rounded-xl
            border
            border-input-border
            bg-surface
            px-3
            text-sm
            text-text-primary
            outline-none
            transition
            focus:border-primary
            lg:w-48
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

        {/* Subject */}
        <select
          value={subjectId}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="
            h-11
            w-full
            rounded-xl
            border
            border-input-border
            bg-surface
            px-3
            text-sm
            text-text-primary
            outline-none
            transition
            focus:border-primary
            lg:w-48
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

        {/* Status */}
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="
            h-11
            w-full
            rounded-xl
            border
            border-input-border
            bg-surface
            px-3
            text-sm
            text-text-primary
            outline-none
            transition
            focus:border-primary
            lg:w-48
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
