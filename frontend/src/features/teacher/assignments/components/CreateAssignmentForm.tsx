import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useCreateAssignment } from "../hooks/useCreateAssignment";
import { useTeacherAssignmentOptions } from "../hooks/useTeacherAssignmentOptions";
import {
  CreateAssignmentSchema,
  type CreateAssignmentFormData,
} from "../schemas/assignmentSchema";

type CreateAssignmentFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export default function CreateAssignmentForm({
  onSuccess,
  onCancel,
}: CreateAssignmentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateAssignmentFormData>({
    resolver: zodResolver(CreateAssignmentSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      maximumMarks: 100,
      classId: "",
      subjectId: "",
    },
  });

  const {
    data: assignmentOptions = [],
    isLoading: optionsLoading,
    isError: optionsError,
  } = useTeacherAssignmentOptions();

  const createAssignmentMutation = useCreateAssignment();

  const selectedClassId = watch("classId");

  // Unique classes
  const classes = useMemo(() => {
    const uniqueClasses = new Map<
      string,
      {
        classId: string;
        className: string;
      }
    >();

    assignmentOptions.forEach((item) => {
      if (!uniqueClasses.has(item.classId)) {
        uniqueClasses.set(item.classId, {
          classId: item.classId,
          className: item.className,
        });
      }
    });

    return Array.from(uniqueClasses.values());
  }, [assignmentOptions]);

  // Subjects assigned to selected class
  const subjects = useMemo(() => {
    if (!selectedClassId) {
      return [];
    }

    const uniqueSubjects = new Map<
      string,
      {
        subjectId: string;
        subjectName: string;
      }
    >();

    assignmentOptions
      .filter((item) => item.classId === selectedClassId)
      .forEach((item) => {
        if (!uniqueSubjects.has(item.subjectId)) {
          uniqueSubjects.set(item.subjectId, {
            subjectId: item.subjectId,
            subjectName: item.subjectName,
          });
        }
      });

    return Array.from(uniqueSubjects.values());
  }, [assignmentOptions, selectedClassId]);

  // Reset subject when selected class changes
  useEffect(() => {
    setValue("subjectId", "");
  }, [selectedClassId, setValue]);


  const onSubmit = async (data: CreateAssignmentFormData) => {
    
    try {
      const deadline = new Date(data.deadline).toISOString();
      await createAssignmentMutation.mutateAsync({
        title: data.title,
        description: data.description,
        deadline,
        maximumMarks: data.maximumMarks,
        classId: data.classId,
        subjectId: data.subjectId,
      });

      onSuccess();
    } catch (error) {
      console.error("CREATE ASSIGNMENT ERROR:", error);
    }
  };

  const isSubmitting = createAssignmentMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Title */}
      <Input
        label="Title"
        placeholder="Enter assignment title"
        error={errors.title?.message}
        {...register("title")}
      />

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Description
        </label>

        <textarea
          rows={4}
          placeholder="Enter assignment description"
          {...register("description")}
          className="
            w-full
            rounded-xl
            border
            border-input-border
            bg-surface
            px-4
            py-3
            text-sm
            text-text-primary
            outline-none
            transition
            focus:border-primary
          "
        />

        {errors.description?.message && (
          <p className="mt-1 text-sm text-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Deadline */}
      <Input
        type="datetime-local"
        label="Deadline"
        error={errors.deadline?.message}
        {...register("deadline")}
      />

      {/* Maximum Marks */}
      <Input
        type="number"
        label="Maximum Marks"
        error={errors.maximumMarks?.message}
        {...register("maximumMarks", {
          valueAsNumber: true,
        })}
      />

      {/* Class */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Class
        </label>

        <select
          {...register("classId")}
          disabled={optionsLoading || optionsError}
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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <option value="">
            {optionsLoading
              ? "Loading assigned classes..."
              : optionsError
                ? "Failed to load classes"
                : "Select class"}
          </option>

          {classes.map((item) => (
            <option key={item.classId} value={item.classId}>
              {item.className}
            </option>
          ))}
        </select>

        {errors.classId?.message && (
          <p className="mt-1 text-sm text-danger">{errors.classId.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          Subject
        </label>

        <select
          {...register("subjectId")}
          disabled={!selectedClassId || optionsLoading || optionsError}
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
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <option value="">
            {!selectedClassId
              ? "Select class first"
              : optionsLoading
                ? "Loading subjects..."
                : optionsError
                  ? "Failed to load subjects"
                  : subjects.length === 0
                    ? "No subjects assigned"
                    : "Select subject"}
          </option>

          {subjects.map((item) => (
            <option key={item.subjectId} value={item.subjectId}>
              {item.subjectName}
            </option>
          ))}
        </select>

        {errors.subjectId?.message && (
          <p className="mt-1 text-sm text-danger">{errors.subjectId.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting || optionsLoading || optionsError}
        >
          {isSubmitting ? "Creating..." : "Create Assignment"}
        </Button>
      </div>
    </form>
  );
}
