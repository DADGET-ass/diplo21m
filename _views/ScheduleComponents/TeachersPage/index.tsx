import { FC, useEffect, useState } from 'react';
import { TeachersHeader } from './TeachersHeader';
import { Arcticle } from '@/_views/ui/Arcticle';
import { IAllTeachers, getTeachers } from '@/data/api';

import cls from './index.module.scss';

// interface TeachersProps {
//     isOpenPopUp: boolean;
// }

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

const TeachersPage = () => {
    const [teachers, setTeachers] = useState<IAllTeachers[]>([]);
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        getTeachers().then(e => {
            setTeachers(e.teachers);
        })
    }, [trigger]);

    const teachersPage = (
        <Arcticle>
            <TeachersHeader setTrigger={setTrigger} />
            {teachers && teachers.length ? (
                <div className={cls.content}>
                    {teachers?.map((e) => (
                        <Teacher teacher={e} key={e._id} />
                    ))}
                </div>
            ) : (
                <>
                    Ничего не найдено
                </>
            )}
        </Arcticle>
    )

    return teachersPage
}

export { TeachersPage };