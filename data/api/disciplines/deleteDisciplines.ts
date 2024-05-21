import { methodDefault } from "../defaultAPI";

export interface IDisciplines {
    id: string;
    name: string;
}

type IResponseDisciplines = {
    message?: string,
    error?: string,
};

export const deleteDisciplines = ({ id }: IDisciplines): Promise<IResponseDisciplines> =>
    methodDefault({
        path: `discipline/delete`,
        method: "POST",
        body: JSON.stringify({
            id,
        })
    });
