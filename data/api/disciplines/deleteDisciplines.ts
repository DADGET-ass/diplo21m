import { methodDefault } from "../defaultAPI";


type IResponseDisciplines = {
    message?: string,
    error?: string,
};

export const deleteDisciplines = ({ id }: { id: string }): Promise<IResponseDisciplines> =>
    methodDefault({
        path: `discipline/delete?id=${id}`,
        method: "POST",
    });
