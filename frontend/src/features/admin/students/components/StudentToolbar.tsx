import { Plus, Search } from "lucide-react";

import Button from "@/components/ui/Button";

type StudentToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddStudent: () => void;
};

export default function StudentToolbar({
  search,
  onSearchChange,
  onAddStudent,
}: StudentToolbarProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Students
          </h1>

          <p className="mt-1 text-sm text-text-secondary sm:text-base">
            Manage all registered students.
          </p>
        </div>

        <Button onClick={onAddStudent} className="w-full sm:w-auto">
          <Plus size={18} />
          Add Student
        </Button>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />

        <input
          type="text"
          value={search}
          placeholder="Search student..."
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
    </div>
  );
}
