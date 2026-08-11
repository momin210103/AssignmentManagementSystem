import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useCreateSubject } from "../hooks/useCreateSubject";

type SubjectFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

type SubjectFormData = {
  name: string;
};

export default function SubjectForm({ onSuccess, onCancel }: SubjectFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectFormData>();

  const createSubjectMutation = useCreateSubject();

  const onSubmit = async (data: SubjectFormData) => {
    await createSubjectMutation.mutateAsync(data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Subject Name"
        placeholder="Enter subject name"
        error={errors.name?.message}
        {...register("name", {
          required: "Subject name is required.",
        })}
      />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={createSubjectMutation.isPending}>
          {createSubjectMutation.isPending ? "Adding..." : "Add Subject"}
        </Button>
      </div>
    </form>
  );
}
