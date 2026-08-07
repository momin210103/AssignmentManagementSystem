import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useClasses } from "../../classes/hooks/useClasses";

type StudentFormData = {
  fullName: string;
  email: string;
  section: string;
  password: string;
  classId: string;
};

export default function StudentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>();
  const { data: classes, isLoading } = useClasses();
  const onSubmit = (data: StudentFormData) => {
    console.log(data);

    // TODO:
    // createStudentMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Full Name"
        placeholder="Enter full name"
        {...register("fullName")}
      />

      <Input
        type="email"
        label="Email"
        placeholder="Enter email"
        {...register("email")}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Class</label>

        <select
          {...register("classId")}
          className="
      h-11
      w-full
      rounded-xl
      border
      border-input-border
      bg-surface
      px-3
      outline-none
      focus:border-primary
    "
        >
          <option value="">{isLoading ? "Loading..." : "Select Class"}</option>

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

      <Input
        type="password"
        label="Password"
        placeholder="********"
        {...register("password")}
      />

      <div className="flex justify-end gap-3">
        <Button type="button" variant="secondary">
          Cancel
        </Button>

        <Button type="submit">Add Student</Button>
      </div>
    </form>
  );
}
