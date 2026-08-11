import { Plus, Search } from "lucide-react";

import Button from "@/components/ui/Button";

type TeacherToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddTeacher: () => void;
};

export default function TeacherToolbar({
  search,
  onSearchChange,
  onAddTeacher,
}: TeacherToolbarProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Teachers
          </h1>

          <p className="mt-1 text-sm text-text-secondary sm:text-base">
            Manage all registered teachers.
          </p>
        </div>

        <Button
          type="button"
          onClick={onAddTeacher}
          leftIcon={<Plus size={18} />}
          className="w-full sm:w-auto"
        >
          Add Teacher
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:max-w-md">
        <Search
          size={18}
          className="
            pointer-events-none
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
          placeholder="Search teacher..."
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
            placeholder:text-text-muted
            focus:border-primary
            focus:ring-2
            focus:ring-primary/10
          "
        />
      </div>
    </div>
  );
}
