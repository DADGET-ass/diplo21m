import { methodDefault } from "../defaultAPI";


type IResponseGroup = {
    message?: string,
    error?: string,
};

export const deleteTeacher = ({ disciplineId, teacherId }: { disciplineId: string, teacherId: string }): Promise<IResponseGroup> =>
    methodDefault({
        path: `discipline/deleteTeacherFromDiscipline`,
        method: "POST",
        body: JSON.stringify({
            disciplineId,
            teacherId
        })
    });
