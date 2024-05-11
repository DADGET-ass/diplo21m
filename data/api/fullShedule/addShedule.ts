import { methodDefault } from "../defaultAPI";

export interface IItems {
    _id: string,
    discipline: string,
    teacher: string,
    type: string,
    audithoria: string,
    number: 0

}

 type IResponseShedule = {
    date:'',
    group: string,
    items: Array<IItems>;
  };

export const addShedule = (): Promise<IResponseShedule> =>
    methodDefault({
        path: `shedule/add`,
        method: "POST",
    });
