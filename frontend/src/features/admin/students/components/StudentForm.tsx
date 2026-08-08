import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useClasses } from "../../classes/hooks/useClasses";
import { useCreateStudent } from "../hooks/useCreateStudent";
import { useUpdateStudent } from "../hooks/useUpdateStudent.ts";

export type StudentFormData = {
  fullName: string;
  email: string;
  password?: string;
  classId: string;
};

type StudentFormProps = {
  student?: {
    id: string;
    fullName: string;
    email: string;
    classId: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
};

export default function StudentForm({
  student,
  onSuccess,
  onCancel,
}: StudentFormProps) {
  const isEdit = !!student;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      classId: "",
    },
  });

  const { data: classes, isLoading: classesLoading } = useClasses();

  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();

  useEffect(() => {
    if (student) {
      reset({
        fullName: student.fullName,
        email: student.email,
        classId: student.classId,
        password: "",
      });
    } else {
      reset({
        fullName: "",
        email: "",
        password: "",
        classId: "",
      });
    }
  }, [student, reset]);

  const onSubmit = async (data: StudentFormData) => {
    try {
      if (isEdit) {
        await updateStudentMutation.mutateAsync({
          id: student.id,
          data: {
            fullName: data.fullName,
            email: data.email,
            classId: data.classId,
          },
        });
      } else {
        await createStudentMutation.mutateAsync({
          fullName: data.fullName,
          email: data.email,
          password: data.password!,
          classId: data.classId,
        });
      }

      reset();
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitting =
    createStudentMutation.isPending || updateStudentMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Full Name"
        placeholder="Enter full name"
        error={errors.fullName?.message}
        {...register("fullName", {
          required: "Full name is required.",
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

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Class</label>

        <select
          {...register("classId", {
            required: "Please select a class.",
          })}
          className="
            h-11
            w-full
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
          <option value="">
            {classesLoading ? "Loading..." : "Select Class"}
          </option>

          {classes?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - Section {item.section}
            </option>
          ))}
        </select>

        {errors.classId && (
          <p className="text-sm text-danger">{errors.classId.message}</p>
        )}
      </div>

      {!isEdit && (
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
      )}

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Saving..."
            : isEdit
              ? "Update Student"
              : "Add Student"}
        </Button>
      </div>
    </form>
  );
}
