import { IAllTeachers, ITeachers } from "@/data/api";
import { Dispatch, FC, SetStateAction } from "react";

import cls from './index.module.scss';
import { CloseIcon } from "@/_views/ui/svg_dynamic/base.svg";
import { deleteTeacher } from "@/data/api/teachers/deleteTeacher";

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
    setTrigger: Dispatch<SetStateAction<boolean>>
}

const Teacher: FC<TeacherProps> = ({ teacher, setTrigger }) => {

    const teacherDelete = () => {
        deleteTeacher({ id: teacher.id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

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
                <div>Отработано часов: {teacher.burden?.filter((e) => `${new Date(e.mounth)?.getFullYear()}_${new Date(e.mounth)?.getMonth}` == `${new Date().getFullYear()}_${new Date().getMonth}`)[0].hH || '0'}/{teacher.aH}</div>
            <div className={cls.close} onClick={teacherDelete}>
                <CloseIcon />
            </div>
            </div>
        </>
    )
}

export { Teacher }