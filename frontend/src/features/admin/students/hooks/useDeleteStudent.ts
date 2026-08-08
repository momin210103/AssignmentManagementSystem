import {useMutation, useQueryClient} from "@tanstack/react-query";

import {deleteStudent} from "../services/studentApi";

export const useDeleteStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteStudent(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
    });
}