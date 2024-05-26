import { methodDefault } from "../defaultAPI";

interface editTeacherParams {
    id: string,
    surname: string,
    name: string,
    patronymic: string,
    aH: number,
}

type IResponseTeacher = {
    error?: string;
    message?: string;
};

export const editTeacher = ({ id, surname, name, patronymic, aH }: editTeacherParams): Promise<IResponseTeacher> =>
    methodDefault({
        path: `teacher/edit`,
        method: "POST",
        body: JSON.stringify({
            id,
            surname,
            name,
            patronymic,
            aH,
        })
    });