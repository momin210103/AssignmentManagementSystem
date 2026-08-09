import { Search } from "lucide-react";

type AssignmentToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;
};

export default function AssignmentToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
}: AssignmentToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
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

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="
          h-11
          min-w-40
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
        <option value="">All Status</option>
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
}
