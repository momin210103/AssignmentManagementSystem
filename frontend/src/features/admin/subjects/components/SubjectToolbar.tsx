import { Plus, Search } from "lucide-react";

import Button from "@/components/ui/Button";

type SubjectToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddSubject: () => void;
};

export default function SubjectToolbar({
  search,
  onSearchChange,
  onAddSubject,
}: SubjectToolbarProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Subjects
          </h1>

          <p className="mt-1 text-sm text-text-secondary sm:text-base">
            Manage all subjects.
          </p>
        </div>

        <Button
          type="button"
          onClick={onAddSubject}
          leftIcon={<Plus size={18} />}
          className="w-full sm:w-auto"
        >
          Add Subject
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
          placeholder="Search subject..."
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
