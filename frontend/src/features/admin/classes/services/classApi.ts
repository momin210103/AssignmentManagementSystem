import { api } from "@/api/axios";
import type { Class, CreateClassRequest } from "../types/class";

export const createClass = async (classData: CreateClassRequest): Promise<CreateClassRequest> => {
  const response = await api.post("/admin/classes", classData);
  return response.data;
};

//Get all classes
export const getClasses = async (): Promise<Class[]> => {
  const response = await api.get("/admin/classes/getall");

  return response.data;
};


// // Get students by class 
// export const getStudentsByClass = async (
//   classId: string,
// ): Promise<Student[]> => {
//   const response = await api.get(
//     `/admin/classes/${classId}/students`,
//   );

//   return response.data;
// };