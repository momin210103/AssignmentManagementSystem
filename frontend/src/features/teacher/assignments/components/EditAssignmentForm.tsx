import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { useTeacherAssignmentOptions } from "../hooks/useTeacherAssignmentOptions";
import { useUpdateAssignment } from "../hooks/useUpdateAssignment";
import {
  CreateAssignmentSchema,
  type CreateAssignmentFormData,
} from "../schemas/assignmentSchema";

import type { TeacherAssignment } from "../types/assignment";

type EditAssignmentFormProps = {
  assignment: TeacherAssignment;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function EditAssignmentForm({
  assignment,
  onSuccess,
  onCancel,
}: EditAssignmentFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateAssignmentFormData>({
    resolver: zodResolver(CreateAssignmentSchema),
    defaultValues: {
      title: assignment.title,
      description: assignment.description,
      deadline: "",
      maximumMarks: assignment.maximumMarks,
      classId: assignment.classId,
      subjectId: assignment.subjectId,
    },
  });

  const {
    data: assignmentOptions = [],
    isLoading: optionsLoading,
    isError: optionsError,
  } = useTeacherAssignmentOptions();

  const updateAssignmentMutation = useUpdateAssignment();

  const selectedClassId = watch("classId");

  /*
   * Convert backend UTC deadline
   * to datetime-local value.
   */
  useEffect(() => {
    const localDeadline = new Date(assignment.deadline);

    const year = localDeadline.getFullYear();
    const month = String(localDeadline.getMonth() + 1).padStart(2, "0");
    const day = String(localDeadline.getDate()).padStart(2, "0");
    const hours = String(localDeadline.getHours()).padStart(2, "0");
    const minutes = String(localDeadline.getMinutes()).padStart(2, "0");

    const formattedDeadline = `${year}-${month}-${day}T${hours}:${minutes}`;

    setValue("deadline", formattedDeadline);
  }, [assignment.deadline, setValue]);

  /*
   * Unique classes
   */
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

  /*
   * Subjects assigned to selected class
   */
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

  /*
   * If assignment data changes,
   * reset the complete form.
   */
  useEffect(() => {
    const localDeadline = new Date(assignment.deadline);

    const year = localDeadline.getFullYear();
    const month = String(localDeadline.getMonth() + 1).padStart(2, "0");
    const day = String(localDeadline.getDate()).padStart(2, "0");
    const hours = String(localDeadline.getHours()).padStart(2, "0");
    const minutes = String(localDeadline.getMinutes()).padStart(2, "0");

    reset({
      title: assignment.title,
      description: assignment.description,
      deadline: `${year}-${month}-${day}T${hours}:${minutes}`,
      maximumMarks: assignment.maximumMarks,
      classId: assignment.classId,
      subjectId: assignment.subjectId,
    });
  }, [assignment, reset]);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = event.target.value;

    setValue("classId", classId);

    /*
     * Subject must be selected again
     * when class changes.
     */
    setValue("subjectId", "");
  };

  const onSubmit = async (data: CreateAssignmentFormData) => {
    try {
      const deadline = new Date(data.deadline).toISOString();

      await updateAssignmentMutation.mutateAsync({
        id: assignment.id,
        data: {
          title: data.title,
          description: data.description,
          deadline,
          maximumMarks: data.maximumMarks,
          classId: data.classId,
          subjectId: data.subjectId,
        },
      });

      onSuccess();
    } catch (error) {
      console.error("UPDATE ASSIGNMENT ERROR:", error);
    }
  };

  const isSubmitting = updateAssignmentMutation.isPending;

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
          value={selectedClassId}
          onChange={handleClassChange}
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
          {isSubmitting ? "Updating..." : "Update Assignment"}
        </Button>
      </div>
    </form>
  );
}
