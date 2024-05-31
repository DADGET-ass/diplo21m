import { methodDefault } from "../defaultAPI";


type IResponseGroup = {
    message?: string,
    error?: string,
};

export const deleteGroup = ({ disciplineId, groupId }: { disciplineId: string, groupId: string }): Promise<IResponseGroup> =>
    methodDefault({
        path: `discipline/deleteGroupFromDiscipline`,
        method: "POST",
        body: JSON.stringify({
            disciplineId,
            groupId
        })
    });
