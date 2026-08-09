import { z } from "zod";

export const CreateAssignmentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),

  description: z.string().min(5, "Description must be at least 5 characters."),

  deadline: z.string().min(1, "Deadline is required."),

  maximumMarks: z.number().min(1, "Maximum marks must be greater than 0."),

  classId: z.string().min(1, "Please select a class."),

  subjectId: z.string().min(1, "Please select a subject."),
});

export type CreateAssignmentFormData = z.infer<typeof CreateAssignmentSchema>;
