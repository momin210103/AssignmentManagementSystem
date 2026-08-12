import { api } from "@/api/axios";

export interface AdminDashboardSummary {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  totalAssingments: number;
  totalSubmissions: number;
}
export const getDashboardSummary = async (): Promise<AdminDashboardSummary> => {
  const response = await api.get("/admin/summary");
  return response.data;
};
