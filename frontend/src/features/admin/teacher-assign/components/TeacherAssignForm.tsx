import { useState } from "react";
import { useForm } from "react-hook-form";

import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";

import { useTeachers } from "../../teachers/hooks/useTeachers";
import { useClasses } from "../../classes/hooks/useClasses";
import { useSubjects } from "../../subjects/hooks/useSubjects";

import { useCreateTeacherAssignment } from "../hooks/useCreateTeacherAssign"

type TeacherAssignmentFormData = {
  teacherId: string;
  classId: string;
  subjectId: string;
};

type TeacherAssigntFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export default function TeacherAssignForm({
  onSuccess,
  onCancel,
}: TeacherAssigntFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherAssignmentFormData>();

  const { data: teachers = [], isLoading: teachersLoading } = useTeachers();

  const { data: classes = [], isLoading: classesLoading } = useClasses();

  const { data: subjects = [], isLoading: subjectsLoading } = useSubjects();

  const createAssignmentMutation = useCreateTeacherAssignment();

  const onSubmit = async (data: TeacherAssignmentFormData) => {
    setFormError(null);
    try {
      await createAssignmentMutation.mutateAsync(data);

      setToastMessage("Teacher assigned successfully.");

      reset();
      onSuccess();
    } catch (error) {
      console.error(error);

      setFormError("Failed to assign teacher.");
    }
  };

  const isSubmitting = createAssignmentMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {toastMessage && <Toast message={toastMessage} type="success" />}
      {formError && <Alert message={formError} />}
      {/* Teacher */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Teacher</label>

        <select
          {...register("teacherId", {
            required: "Please select a teacher.",
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
            {teachersLoading ? "Loading teachers..." : "Select Teacher"}
          </option>

          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.fullName}
            </option>
          ))}
        </select>

        {errors.teacherId && (
          <p className="text-sm text-danger">{errors.teacherId.message}</p>
        )}
      </div>

      {/* Class */}
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
            {classesLoading ? "Loading classes..." : "Select Class"}
          </option>

          {classes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - Section {item.section}
            </option>
          ))}
        </select>

        {errors.classId && (
          <p className="text-sm text-danger">{errors.classId.message}</p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Subject</label>

        <select
          {...register("subjectId", {
            required: "Please select a subject.",
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
            {subjectsLoading ? "Loading subjects..." : "Select Subject"}
          </option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        {errors.subjectId && (
          <p className="text-sm text-danger">{errors.subjectId.message}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Assigning..." : "Assign Teacher"}
        </Button>
      </div>
    </form>
  );
}
