import { useState } from "react";

import Button from "@/components/ui/Button";

import { useCreateClass } from "../hooks/useCreateClass";

type ClassFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export default function ClassForm({ onSuccess, onCancel }: ClassFormProps) {
  const createClassMutation = useCreateClass();

  const [name, setName] = useState("");
  const [section, setSection] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !section.trim()) {
      return;
    }

    createClassMutation.mutate(
      {
        name: name.trim(),
        section: section.trim(),
      },
      {
        onSuccess: () => {
          setName("");
          setSection("");
          onSuccess();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Class Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Class Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Level 1"
          className="
            h-11
            w-full
            rounded-xl
            border
            border-input-border
            bg-surface
            px-4
            text-sm
            text-text-primary
            outline-none
            placeholder:text-text-muted
            focus:border-primary
          "
        />
      </div>

      {/* Section */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Section
        </label>

        <input
          type="text"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          placeholder="e.g. A"
          className="
            h-11
            w-full
            rounded-xl
            border
            border-input-border
            bg-surface
            px-4
            text-sm
            text-text-primary
            outline-none
            placeholder:text-text-muted
            focus:border-primary
          "
        />
      </div>

      {/* Error */}
      {createClassMutation.isError && (
        <p className="text-sm text-danger">
          Failed to create class. Please try again.
        </p>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={createClassMutation.isPending}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={
            createClassMutation.isPending || !name.trim() || !section.trim()
          }
        >
          {createClassMutation.isPending ? "Creating..." : "Create Class"}
        </Button>
      </div>
    </form>
  );
}
