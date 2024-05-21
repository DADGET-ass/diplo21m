import { IDiscipline, ITeacher } from "@/data/types/interfaces";
import { methodDefault } from "../defaultAPI";
import { IGroups } from "../disciplines/addDisciplines";




export interface SheduleItem {
    discipline: {
        _id: string;
        name: string;
    }
    teacher: {
        _id: string;
        surname: string;
        name: string;
        patronymic: string;
    }
    type: {
        _id: string;
        name: string;
    }
    audithoria: {
        _id: string;
        name: string;
    }
    number: number;
    _id: string;

}

interface IGetSheduleParams {
    date: string,
    group: string,
}

export interface IShedule {
    id: string,
    date: Date,
    group: Array<IGroups>,
    items: Array<SheduleItem>
}

type IResponseShedule = {
    schedule?: Array<IShedule>;
    message?:string;
};

export const getShedule = ({ date, group }: IGetSheduleParams): Promise<IResponseShedule> =>
    methodDefault({
        path: `schedule/get?date=${date}&group=${group}`,
        method: "GET",
    });
