import { methodDefault } from "../defaultAPI";

export interface IItems {
    discipline: string,
    teacher: string,
    type: string,
    audithoria: string,
    number: number

}
export type IResponseAddShedule = {
    message?: string;
};

export interface IAddShedule {
    date:string,
    group: string,
    items: Array<IItems>;
  };

export const addShedule = ({date, group, items}:IAddShedule): Promise<IResponseAddShedule> =>
    methodDefault({
        path: `shedule/add`,
        method: "POST",
        body: JSON.stringify({
            date,
            group,
            items
        })
    });
