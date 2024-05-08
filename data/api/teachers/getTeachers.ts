import { methodDefault } from "../defaultAPI";

interface IDisciplines {
    _id: string,
    name: string
}
interface ITeachParams {
    id: string,
}

export interface IAllTeachers {
    id: string,
    surname: string,
    name: string,
    patronymic: string,
    aH: string,
    hH: string,
    disciplines: Array<IDisciplines>

}

type IResponseTeachers = {
    teachers: Array<IAllTeachers>;
};

export const getTeachers = ({ id }: ITeachParams): Promise<IResponseTeachers> =>
    methodDefault({
        path: `teacher/get?id=${id}`,
        method: "GET",
    });
