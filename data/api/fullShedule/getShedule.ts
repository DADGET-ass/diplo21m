import { IDiscipline, ITeacher } from "@/data/types/interfaces";
import { methodDefault } from "../defaultAPI";
import { IGroups } from "../facultets/getFacultets";



export interface SheduleItem {
    discipline: {
        _id: string;
        name: string;
    }
    teacher: {
        _id: string;
        name: string;
    }
    type: {
        _id: string;
        name: string;
    }
    audithories: {
        _id: string;
        name: string;
    }
    number: number;
    _id: string;

}

export interface IShedule {
    id: string,
    date: Date,
    group: Array<IGroups>,
    items: Array<SheduleItem>
}

type IResponseShedule = {
    shedule: Array<IShedule>;
};

export const getShedule = (): Promise<IResponseShedule> =>
    methodDefault({
        path: `shedule/get}`,
        method: "GET",
    });
