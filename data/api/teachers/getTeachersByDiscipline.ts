import { methodDefault } from "../defaultAPI";

export interface ITeachers {
    _id: string,
    surname: string,
    name: string,
    patronymic: string,
    aH: string,
    hH: string,

}

 type IResponseTeachers = {
    teachers: Array<ITeachers>;
  };

export const getTeachersByDiscipline = ({ id }: { id: string }): Promise<IResponseTeachers> =>
    methodDefault({
        path: `teacher/getTeacherByDiscipline?id=${id}`,
        method: "GET",
    });
