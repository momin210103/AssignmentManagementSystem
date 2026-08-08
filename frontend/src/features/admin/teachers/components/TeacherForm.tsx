import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useCreateTeacher } from "../hooks/useCreateTeacher";
import {TeacherSchema, type TeacherFormData} from "../schemas/teacherSchema";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";

type TeacherFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

  
export default function TeacherForm({ onSuccess, onCancel }: TeacherFormProps) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(TeacherSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  

  const createTeacherMutation = useCreateTeacher();

  const onSubmit = async (data: TeacherFormData) => {
    try {
      await createTeacherMutation.mutateAsync(data);
      alert("Teacher created successfully.");

      reset();
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to create teacher.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Full Name"
        placeholder="Enter full name"
        error={errors.fullName?.message}
        {...register("fullName", {
          required: "Full name is required.",
          minLength: {
            value: 3,
            message: "Full name must be at least 3 characters.",
          },
        })}
      />

      <Input
        type="email"
        label="Email"
        placeholder="Enter email"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required.",
        })}
      />

      <Input
        type="password"
        label="Password"
        placeholder="********"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required.",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters.",
          },
        })}
      />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={createTeacherMutation.isPending}>
          {createTeacherMutation.isPending ? "Saving..." : "Add Teacher"}
        </Button>
      </div>
    </form>
  );
}
