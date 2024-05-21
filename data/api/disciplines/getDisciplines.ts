import { methodDefault } from "../defaultAPI";

export interface IItem {
    _id: string;
    name: string;
}

export interface IGroup {
    _id: string;
    item: IItem;
    burden?: {
        month: string;
        hH: number;
    };
    aH: number;
}

export interface IDisciplines {
    id: string;
    name: string;
    groups: IGroup[];
}

type IResponsedisciplines = {
    disciplines: IDisciplines[];
};

export const getDisciplines = ({ id }: { id?: string }): Promise<IResponsedisciplines> =>
    methodDefault({
        path: `discipline/get`,
        method: "GET",
    });
