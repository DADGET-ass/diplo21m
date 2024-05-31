import { methodDefault } from "../defaultAPI";


type IResponseDeleteGroup = {
    message?: string,
    error?: string,
};

export const deleteGroup = ({ id }: { id: string }): Promise<IResponseDeleteGroup> =>
    methodDefault({
        path: `facultet/deleteGroup?id=${id}`,
        method: "POST",
    });
