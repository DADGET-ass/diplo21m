import { methodDefault } from "../defaultAPI";

export interface AddShedulePayload {
    date: string,
    group: string,
    items: Array<IItems>;
};

export type IResponseAddShedule = {
    message?: string;
};

export interface IItems {
    discipline: string,
    teacher: string,
    type: string,
    audithoria: string,
    number: number
}

export const addShedule = ({ date, group, items }: AddShedulePayload): Promise<IResponseAddShedule> =>
    methodDefault({
        path: `schedule/add`,
        method: "POST",
        body: JSON.stringify({
            date,
            group,
            items
        })
    });
