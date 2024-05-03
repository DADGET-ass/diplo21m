import { methodDefault } from "../defaultAPI";

export interface addTeacherProps {
    surname: string,
    name: string,
    patronymic: string,
    aH: number,
}

interface addTeacherResponse {
    error: string,
    message: string
}

/**
 * @function addTeacher
 * @props surname - string
 * @props name - string
 * @props patronymic - string
 * @props aH - number
 */

export const addTeacher = ({ surname, name, patronymic, aH }: addTeacherProps): Promise<addTeacherResponse> =>
    methodDefault({
        path: `teacher/add`,
        method: "POST",
        body: JSON.stringify({
            surname,
            name,
            patronymic,
            aH,
        })
    });