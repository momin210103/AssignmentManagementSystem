import { useState } from "react";
import {
  ArrowLeft,
  GraduationCap,
  Mail,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmAlert from "@/components/ui/ConfirmAlert";
import Modal from "@/components/ui/Modal";

import StudentForm from "../components/StudentForm";
import { useDeleteStudent } from "../hooks/useDeleteStudent";
import { useStudents } from "../hooks/useStudents";

export default function StudentDetailsPage() {
  const navigate = useNavigate();

  const { studentId } = useParams<{
    studentId: string;
  }>();

  const [open, setOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const { data: students = [], isLoading, isError } = useStudents();

  const deleteStudentMutation = useDeleteStudent();

  const student = students.find((item) => item.id === studentId);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!student) return;

    deleteStudentMutation.mutate(student.id, {
      onSuccess: () => {
        setConfirmDeleteOpen(false);
        navigate("/admin/students");
      },
    });
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <p className="py-10 text-center text-sm text-text-muted">
          Loading student details...
        </p>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-6">
        <p className="py-10 text-center text-sm text-danger">
          Failed to load student details.
        </p>
      </Card>
    );
  }

  if (!student) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <h2 className="text-lg font-semibold text-text-primary">
            Student not found
          </h2>

          <p className="mt-1 text-sm text-text-secondary">
            The student you are looking for does not exist.
          </p>

          <Button
            type="button"
            variant="secondary"
            leftIcon={<ArrowLeft size={17} />}
            onClick={() => navigate("/admin/students")}
            className="mt-5"
          >
            Back to Students
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3 sm:gap-4">
          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/admin/students")}
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              border border-border
              text-text-secondary
              transition
              hover:bg-primary/10
              hover:text-primary
              sm:h-10 sm:w-10
            "
            aria-label="Back to students"
          >
            <ArrowLeft size={18} />
          </button>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">
              Student Details
            </h1>

            <p className="mt-1 text-sm text-text-secondary">
              View and manage student information.
            </p>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <Button
            type="button"
            variant="secondary"
            leftIcon={<Pencil size={16} />}
            onClick={() => setOpen(true)}
          >
            Edit
          </Button>

          <Button
            type="button"
            variant="danger"
            leftIcon={<Trash2 size={16} />}
            onClick={handleDelete}
            disabled={deleteStudentMutation.isPending}
          >
            {deleteStudentMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div
            className="
              flex h-16 w-16 shrink-0
              items-center justify-center
              rounded-full
              bg-primary/10
              text-xl font-bold
              text-primary
            "
          >
            {student.fullName.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2 className="break-words text-xl font-bold text-text-primary sm:text-2xl">
              {student.fullName}
            </h2>

            <p className="mt-1 text-sm text-text-secondary">Student</p>
          </div>
        </div>
      </Card>

      {/* Information */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Personal Information */}
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-text-primary">
            Personal Information
          </h2>

          <div className="mt-5 space-y-5">
            <InfoItem
              icon={<Mail size={18} />}
              label="Email"
              value={student.email}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Phone Number"
              value={student.phoneNumber ?? "Not provided"}
            />
          </div>
        </Card>

        {/* Academic Information */}
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-text-primary">
            Academic Information
          </h2>

          <div className="mt-5">
            <InfoItem
              icon={<GraduationCap size={18} />}
              label="Class"
              value={
                student.className
                  ? `${student.className} (${student.section})`
                  : "Not assigned"
              }
            />
          </div>
        </Card>
      </div>

      {/* Mobile Actions */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        <Button
          type="button"
          variant="secondary"
          leftIcon={<Pencil size={16} />}
          onClick={() => setOpen(true)}
          className="w-full"
        >
          Edit
        </Button>

        <Button
          type="button"
          variant="danger"
          leftIcon={<Trash2 size={16} />}
          onClick={handleDelete}
          disabled={deleteStudentMutation.isPending}
          className="w-full"
        >
          {deleteStudentMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>

      {/* Edit Student Modal */}
      <Modal isOpen={open} title="Edit Student" onClose={handleClose}>
        <StudentForm
          student={student}
          onSuccess={handleClose}
          onCancel={handleClose}
        />
      </Modal>

      <ConfirmAlert
        isOpen={confirmDeleteOpen}
        title="Delete Student"
        message={`Are you sure you want to delete ${student ? student.fullName : ""}?`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleteStudentMutation.isPending}
        onCancel={() => setConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="
          flex h-9 w-9 shrink-0
          items-center justify-center
          rounded-lg
          bg-primary/10
          text-primary
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-text-muted">{label}</p>

        <p className="mt-1 break-words text-sm font-medium text-text-primary">
          {value}
        </p>
      </div>
    </div>
  );
}
