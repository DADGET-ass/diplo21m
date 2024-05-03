import { methodDefault } from "../defaultAPI";

export interface IAllTeachers {
    _id: string,
    surname: string,
    name: string,
    patronymic: string,
    aH: string,
    hH: string,

}

 type IResponseTeachers = {
    teachers: Array<IAllTeachers>;
  };

export const getTeachers = (): Promise<IResponseTeachers> =>
    methodDefault({
        path: `teacher/get`,
        method: "GET",
    });
