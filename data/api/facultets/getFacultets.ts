import { methodDefault } from "../defaultAPI";


export interface IGroupsFacult {
    _id: string,
    name: string,
}

export interface ICourses {
    _id: string,
    name: string,
    groups: Array<IGroupsFacult>,
}

export interface IFacultets {
    _id: string,
    name: string,
    courses: Array<ICourses>,
}

type IResponseFacultets = {
    facultets: Array<IFacultets>;
};

export const getFacultets = (): Promise<IResponseFacultets> =>
    methodDefault({
        path: `facultet/get`,
        method: "GET",
    });