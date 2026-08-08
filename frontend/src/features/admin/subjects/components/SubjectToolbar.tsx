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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Subjects</h1>

          <p className="mt-1 text-text-secondary">Manage all subjects.</p>
        </div>

        <Button onClick={onAddSubject}>
          <Plus size={18} />
          Add Subject
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
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
            focus:border-primary
          "
        />
      </div>
    </div>
  );
}
