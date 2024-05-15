import { methodDefault } from "../defaultAPI";

export interface IGroups {
    groupName: string,
    aH:number,
}

export interface IDiscipline {
    name: string,
    groups: Array<IGroups>,
    teachers: Array<string>,
    pc:boolean,
}

type IResponseDisciplines = {
    message?: string,
    error?: string,
};

export const addDisciplines = ({ name, groups, teachers, pc }: IDiscipline): Promise<IResponseDisciplines> =>
    methodDefault({
        path: `discipline/add`,
        method: "POST",
        body: JSON.stringify({
            name,
            groups,
            teachers,
            pc
        })
    });
