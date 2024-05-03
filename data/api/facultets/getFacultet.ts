import { IFacultets } from './getFacultets';
import { methodDefault } from "../defaultAPI";

type IResponseFacultet = {
    facultet: Array<IFacultets>;
};

export const getFacultet = ({ id }: { id: string }): Promise<IResponseFacultet> =>
    methodDefault({
        path: `facultet/getOne?id=${id}`,
        method: "GET",
    });