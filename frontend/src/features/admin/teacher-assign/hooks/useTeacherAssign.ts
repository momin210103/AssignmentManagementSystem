import { useQuery } from "@tanstack/react-query"
import { getTeacherAssigns } from "../services/teacherAssignApi"


export const useTeacherAssign = () => {
    return useQuery({
        queryKey: ["teacher-assign"],
        queryFn: getTeacherAssigns})
}