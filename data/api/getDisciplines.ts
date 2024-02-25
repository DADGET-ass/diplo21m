import { methodDefault } from "./defaultAPI";

export interface IDiscipline {
    _id: string,
    name: string,
    facultet: string,
    teachers: Array<string>,

}

export type IResponseDisciplines = {
    disciplines: Array<IDiscipline>;
  };

export const getDisciplines = (): Promise<IResponseDisciplines> =>
    methodDefault({
        path: `discipline/get`,
        method: "GET",
    });
