import { methodDefault } from "../defaultAPI";


type IResponseAudithories = {
    message?: string,
    error?: string,
};

export const deleteAudithories = ({ id }: { id: string }): Promise<IResponseAudithories> =>
    methodDefault({
        path: `audithories/delete?id=${id}`,
        method: "POST",
    });
