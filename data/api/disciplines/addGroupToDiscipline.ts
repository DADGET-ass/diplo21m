import { methodDefault } from "../defaultAPI";



export interface IAddGroupToDiscipline {
    disciplineId: string,
    groupId: string,
    aH: number
}

type IResponseDisciplines = {
    message?: string,
    error?: string,
};

export const addGroupToDiscipline = ({ disciplineId, groupId, aH }: IAddGroupToDiscipline): Promise<IResponseDisciplines> =>
    methodDefault({
        path: `discipline/addGroupToDiscipline`,
        method: "POST",
        body: JSON.stringify({
            disciplineId,
            groupId,
            aH
        })
    });
