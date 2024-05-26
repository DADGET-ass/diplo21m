import { methodDefault } from "../defaultAPI";


type IResponseShedule = {
    message?: string,
    error?: string,
};

export const deleteShedule = ({ id }: { id: string }): Promise<IResponseShedule> =>
    methodDefault({
        path: `shedule/delete?id=${id}`,
        method: "POST",
    });
