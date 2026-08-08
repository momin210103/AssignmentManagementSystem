import { Search } from "lucide-react";

type AssignmentToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function AssignmentToolbar({
  search,
  onSearchChange,
}: AssignmentToolbarProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Assignments</h1>

        <p className="mt-1 text-text-secondary">
          View assignments given by teachers.
        </p>
      </div>

      <div className="relative max-w-md">
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
    </div>
  );
}
