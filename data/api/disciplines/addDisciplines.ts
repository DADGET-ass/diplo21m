import { methodDefault } from "../defaultAPI";

export interface IDiscipline {
    _id: string,
    name: string,
    groups: string,
    teachers: Array<string>,
    aH: number,

}

 type IResponseDisciplines = {
    disciplines: Array<IDiscipline>;
  };

export const addDisciplines = (): Promise<IResponseDisciplines> =>
    methodDefault({
        path: `discipline/add`,
        method: "POST",
    });
