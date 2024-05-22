import { methodDefault } from "../defaultAPI";


type IResponseTeacher = {
    message?: string,
    error?: string,
};

export const deleteTeacher = ({ id }: { id: string }): Promise<IResponseTeacher> =>
    methodDefault({
        path: `teacher/delete?id=${id}`,
        method: "POST",
    });
