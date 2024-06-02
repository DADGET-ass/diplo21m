import { methodDefault } from "../defaultAPI";
import { IItems } from "./addShedule";

export interface editSheduleParams {
    date: string,
    group: string,
    items: Array<IItems>;
};

export type IResponseEditShedule = {
    message?: string;
};



export const editShedule = ({ date, group, items }: editSheduleParams): Promise<IResponseEditShedule> =>
    methodDefault({
        path: `schedule/edit`,
        method: "POST",
        body: JSON.stringify({
            date,
            group,
            items
        })
    });
