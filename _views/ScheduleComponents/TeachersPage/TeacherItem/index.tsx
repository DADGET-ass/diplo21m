import { IAllTeachers } from "@/data/api";
import { FC } from "react";

interface TeacherProps {
    teacher: IAllTeachers;
}

const Teacher: FC<TeacherProps> = ({ teacher }) => {

    return (
        <>
            <div style={{ textTransform: 'uppercase' }}>Личный идентификатор: №{teacher._id.slice(0, 8)}</div>
            <div>Фамилия: {teacher.surname}</div>
            <div>Имя: {teacher.name}</div>
            <div>Отчество: {teacher.patronymic}</div>
            <div>Всего часов: {teacher.aH}</div>
            <div>Отработано часов: {teacher.hH || '0'}</div>
        </>
    )
}

export {Teacher}