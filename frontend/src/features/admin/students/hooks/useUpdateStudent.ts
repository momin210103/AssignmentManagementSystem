import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import{
    updateStudent,
    type UpdateStudentRequest,
} from "../services/studentApi";

export const useUpdateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {id: string, data: UpdateStudentRequest}) => updateStudent(data.id, data.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
    });
}