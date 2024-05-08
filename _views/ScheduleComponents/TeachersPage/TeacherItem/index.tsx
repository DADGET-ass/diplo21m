import { IAllTeachers, ITeachers } from "@/data/api";
import { FC } from "react";

import cls from './index.module.scss';
import { IDisciplines } from "@/data/api/disciplines/getDisciplines";

interface DisciplineProps {
    name: string
}

const Discipline: FC<DisciplineProps> = ({ name }) => {

    return (
        <div>{name}</div>
    )
}

interface TeacherProps {
    teacher: IAllTeachers,
}

const Teacher: FC<TeacherProps> = ({ teacher }) => {

    return (
        <>
            <div className={cls.teachersBlock}>
                <div style={{ textTransform: 'uppercase' }} className={cls.ident}>Личный идентификатор: №{teacher.id.slice(0, 8)}</div>
                <div className={cls.teacher}>ФИО: {teacher.surname} {teacher.name} {teacher.patronymic}</div>
                {teacher.disciplines && (
                    <div className={cls.row}>
                        <p>Дисциплины: </p>
                        {teacher.disciplines.map((e, index) => (
                            <Discipline key={e._id} name={e.name} />
                        ))}
                    </div>
                )}
                <div>Всего часов: {teacher.aH}</div>
                <div>Отработано часов: {teacher.hH || '0'}/{teacher.aH}</div>
            </div>
        </>
    )
}

export { Teacher }