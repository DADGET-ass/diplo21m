import { methodDefault } from "../defaultAPI";



export interface IAddGroupToDiscipline {
    disciplineId: string,
    teacherId: string,
}

type IResponseTeacher = {
    message?: string,
    error?: string,
};

export const addTeacherToDiscipline = ({ disciplineId, teacherId }: IAddGroupToDiscipline): Promise<IResponseTeacher> =>
    methodDefault({
        path: `discipline/addTeacherToDiscipline`,
        method: "POST",
        body: JSON.stringify({
            disciplineId,
            teacherId,
        })
    });
