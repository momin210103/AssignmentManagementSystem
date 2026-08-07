import { z } from "zod";

export const studentSchema = z.object({
  fullName: z.string().min(3, "Full name is required."),
  email: z.email("Invalid email."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  classId: z.string().min(1, "Please select a class."),
});

export type StudentFormData = z.infer<typeof studentSchema>;
