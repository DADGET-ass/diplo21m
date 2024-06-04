import { ITeacher } from "@/data/types/interfaces";
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
    }[];
    aH: number;
}

export interface IDisciplines {
    id: string;
    name: string;
    groups: IGroup[];
    teachers: [],
    pc: boolean,
}

type IResponsedisciplines = {
    disciplines: IDisciplines[];
};

export const getDisciplines = ({ groupId }: { groupId?: string }): Promise<IResponsedisciplines> =>
    methodDefault({
        path: `discipline/get?groupId=${groupId}`,
        method: "GET",
    });
