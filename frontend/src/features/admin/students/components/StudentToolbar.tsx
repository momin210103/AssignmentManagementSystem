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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Students</h1>

          <p className="mt-1 text-text-secondary">
            Manage all registered students.
          </p>
        </div>

        <Button onClick={onAddStudent}>
          <Plus size={18} />
          Add Student
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
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
