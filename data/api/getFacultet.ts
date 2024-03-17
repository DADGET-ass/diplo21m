import { methodDefault } from "./defaultAPI";
import { IFacultets } from "./getFacultets";

type IResponseFacultet = {
    facultet: Array<IFacultets>;
};

export const getFacultet = ({ id }: { id: string }): Promise<IResponseFacultet> =>
    methodDefault({
        path: `facultet/getOne?id=${id}`,
        method: "GET",
    });