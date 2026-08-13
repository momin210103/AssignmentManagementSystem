import { z } from "zod";

export const TeacherSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  email: z.email("Invalid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const UpdateTeacherSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters."),
  email: z.email("Invalid email."),
  password: z
    .string()
    .refine(
      (value) => value === "" || value.length >= 6,
      "Password must be at least 6 characters.",
    ),
});

export type TeacherFormData = z.infer<typeof TeacherSchema>;
export type UpdateTeacherFormData = z.infer<typeof UpdateTeacherSchema>;
