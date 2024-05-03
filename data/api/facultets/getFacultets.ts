import { methodDefault } from "../defaultAPI";


export interface IGroups {
    _id: string,
    name: string,
}

export interface ICourses {
    _id: string,
    name: string,
    groups: Array<IGroups>,
}

export interface IFacultets {
    _id: string,
    name: string,
    courses: Array<ICourses>,
    groups: Array<IGroups>,
}

type IResponseFacultets = {
    facultets: Array<IFacultets>;
};

export const getFacultets = (): Promise<IResponseFacultets> =>
    methodDefault({
        path: `facultet/get`,
        method: "GET",
    });