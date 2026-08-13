import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Toast from "@/components/ui/Toast";

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
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherFormData>({
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
    setFormError(null);
    try {
      if (isEdit && teacher) {
        await updateTeacherMutation.mutateAsync({
          id: teacher.id,
          data: {
            fullName: data.fullName,
            email: data.email,
          },
        });

        setToastMessage("Teacher updated successfully.");
      } else {
        await createTeacherMutation.mutateAsync({
          fullName: data.fullName,
          email: data.email,
          password: data.password!,
        });

        setToastMessage("Teacher created successfully.");
      }

      reset();
      onSuccess();
    } catch (error) {
      console.error("Teacher operation failed:", error);
      setFormError(isEdit ? "Failed to update teacher." : "Failed to create teacher.");
    }
  };

  const isSubmitting =
    createTeacherMutation.isPending || updateTeacherMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {toastMessage && <Toast message={toastMessage} type="success" />}
      {formError && <Alert message={formError} />}
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
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="********"
          error={errors.password?.message}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-text-muted hover:text-text-primary p-1 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
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
