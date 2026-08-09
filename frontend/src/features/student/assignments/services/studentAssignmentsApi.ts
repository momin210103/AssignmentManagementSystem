import { api } from "@/api/axios";
import type { StudentAssignment } from "../types/studentAssignments";


export const getStudentAssignments = async (): Promise<StudentAssignment[]> => {
    const response = await api.get("/assignments/student");
    return response.data;

} 

