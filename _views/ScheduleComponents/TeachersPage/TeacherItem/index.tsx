import { IAllTeachers } from "@/data/api";
import { FC } from "react";

import cls from './index.module.scss';

interface TeacherProps {
    teacher: IAllTeachers;
}

const Teacher: FC<TeacherProps> = ({ teacher }) => {

    return (
        <>
            <div className={cls.teachersBlock}>
                <div style={{ textTransform: 'uppercase' } } className={cls.ident}>Личный идентификатор: №{teacher._id.slice(0, 8)}</div>
                <div className={cls.teacher}>ФИО: {teacher.surname} {teacher.name} {teacher.patronymic}</div>
                <div>Всего часов: {teacher.aH}</div>
                <div>Отработано часов: {teacher.hH || '0'}/{teacher.aH}</div>
            </div>
        </>
    )
}

export { Teacher }