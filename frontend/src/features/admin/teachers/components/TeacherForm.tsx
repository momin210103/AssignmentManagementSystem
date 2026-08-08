import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useCreateTeacher } from "../hooks/useCreateTeacher";
import { useUpdateTeacher } from "../hooks/useUpdateTeacher";

import {
  TeacherSchema,
  UpdateTeacherSchema,
  type TeacherFormData,
} from "../schemas/teacherSchema";

type TeacherFormProps = {
  teacher?: {
    id: string;
    fullName: string;
    email: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
};

export default function TeacherForm({
  teacher,
  onSuccess,
  onCancel,
}: TeacherFormProps) {
  const isEdit = !!teacher;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? UpdateTeacherSchema : TeacherSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const createTeacherMutation = useCreateTeacher();
  const updateTeacherMutation = useUpdateTeacher();

  useEffect(() => {
    if (teacher) {
      reset({
        fullName: teacher.fullName,
        email: teacher.email,
        password: "",
      });
    } else {
      reset({
        fullName: "",
        email: "",
        password: "",
      });
    }
  }, [teacher, reset]);

  const onSubmit = async (data: TeacherFormData) => {
    try {
      if (isEdit && teacher) {
        await updateTeacherMutation.mutateAsync({
          id: teacher.id,
          data: {
            fullName: data.fullName,
            email: data.email,
          },
        });

        alert("Teacher updated successfully.");
      } else {
        await createTeacherMutation.mutateAsync({
          fullName: data.fullName,
          email: data.email,
          password: data.password!,
        });

        alert("Teacher created successfully.");
      }

      reset();
      onSuccess();
    } catch (error) {
      console.error("Teacher operation failed:", error);

      alert(isEdit ? "Failed to update teacher." : "Failed to create teacher.");
    }
  };

  const isSubmitting =
    createTeacherMutation.isPending || updateTeacherMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Full Name"
        placeholder="Enter full name"
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      <Input
        type="email"
        label="Email"
        placeholder="Enter email"
        error={errors.email?.message}
        {...register("email")}
      />

      {!isEdit && (
        <Input
          type="password"
          label="Password"
          placeholder="********"
          error={errors.password?.message}
          {...register("password")}
        />
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Update Teacher"
              : "Add Teacher"}
        </Button>
      </div>
    </form>
  );
}
