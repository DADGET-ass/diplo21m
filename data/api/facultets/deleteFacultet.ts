import { methodDefault } from "../defaultAPI";


type IResponseFacultet = {
    message?: string,
    error?: string,
};

export const deleteFacultet = ({ id }: { id: string }): Promise<IResponseFacultet> =>
    methodDefault({
        path: `facultet/delete?id=${id}`,
        method: "POST",
    });
