import { Plus, Search } from "lucide-react";

import Button from "@/components/ui/Button";

type ClassToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  onAddClass: () => void;
};

export default function ClassToolbar({
  search,
  onSearchChange,
  onAddClass,
}: ClassToolbarProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Classes
          </h1>

          <p className="mt-1 text-sm text-text-secondary">
            Manage all classes and sections.
          </p>
        </div>

        <Button onClick={onAddClass} className="w-full sm:w-auto">
          <Plus size={18} />
          Add Class
        </Button>
      </div>

      <div className="relative w-full sm:max-w-md">
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
          placeholder="Search class..."
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
