import { methodDefault } from "../defaultAPI";


interface IBurden {
    _id: string,
    hH: number,
    mounth: Date,

}

export interface ITeachers {
    _id: string,
    surname: string,
    name: string,
    patronymic: string,
    aH: number,
    burden: Array<IBurden>

}

type IResponseTeachers = {
    teachers: Array<ITeachers>;
};

export const getTeachersByDiscipline = ({ id, date }: { id: string, date: string }): Promise<IResponseTeachers> =>
    methodDefault({
        path: `teacher/getTeacherByDiscipline?id=${id}&date=${date}`,
        method: "GET",
    });
