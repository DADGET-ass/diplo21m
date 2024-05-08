import { FC, useEffect, useState } from 'react';
import { TeachersHeader } from './TeachersHeader';
import { Arcticle } from '@/_views/ui/Arcticle';
import { IAllTeachers, getTeachers } from '@/data/api';

import cls from './index.module.scss';
import { Teacher } from './TeacherItem';



const TeachersPage = () => {
    const [teachers, setTeachers] = useState<IAllTeachers[]>([]);
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        getTeachers({id:''}).then(e => {
            setTeachers(e.teachers);
        })
    }, [trigger]);

    const teachersPage = (
        <Arcticle>
            <TeachersHeader setTrigger={setTrigger} />
            {teachers && teachers.length ? (
                <div className={cls.content}>
                    {teachers?.map((e) => (
                        <Teacher teacher={e} key={e.id} />
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