import { methodDefault } from "../defaultAPI";

interface IEditDisciplinesAh {
    disciplineId: string,
    groupId: string,
    aH: number
}

type IResponsedisciplines = {
    message?: string;
    error?: string;
};

export const editGroupAh = ({ disciplineId, groupId, aH }: IEditDisciplinesAh): Promise<IResponsedisciplines> =>
    methodDefault({
        path: `discipline/editGroupAh`,
        method: "POST",
        body: JSON.stringify({
            disciplineId,
            groupId,
            aH
        })
    });
