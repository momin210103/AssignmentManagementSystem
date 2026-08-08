import { z } from "zod";

export const TeacherSchema = z.object({
  fullName: z.string().min(3, "Full name is required."),
  email: z.email("Invalid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export type TeacherFormData = z.infer<typeof TeacherSchema>;
