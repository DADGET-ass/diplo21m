import { methodDefault } from "../defaultAPI";

export interface IDiscipline {
    name: string,
    groups: Array<string>,
    teachers: Array<string>,
}

type IResponseDisciplines = {
    message?: string,
    error?: string,
};

export const addDisciplines = ({ name, groups, teachers }: IDiscipline): Promise<IResponseDisciplines> =>
    methodDefault({
        path: `discipline/add`,
        method: "POST",
        body: JSON.stringify({
            name,
            groups,
            teachers,
        })
    });
