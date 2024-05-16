import { FC, useEffect, useState } from 'react';

import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { Arcticle } from '@/_views/ui/Arcticle';
import { SheduleTable } from '../SheduleTable';

import cls from './index.module.scss';
import { ICourses, IFacultets, IGroups, getFacultets } from '@/data/api';
import { Title } from '@/_views/ui/Title/Index';
import { Calendar } from '@/_views/ui/Calendar';
import { useDateStore } from '@/data/store/useDateStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { SpectateShedule } from '../SpectateShedule';
import { Button } from '@/_views/ui/Button';
import { IGroupsFacult } from '@/data/api/facultets/getFacultets';


interface CoursesProps {
    course: ICourses;
}

const Courses: FC<CoursesProps> = ({ course }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>

            <div className={cls.group}>
                <div className={cls.facultsBlock}>
                    <div className={cls.name}>
                        {course.name}
                    </div>
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div>
            {isOpen && course.groups.map((group) => (
                <Group group={group} key={group._id} />
            ))}
        </>
    )
}

interface GroupsProps {
    group: IGroupsFacult,
}

const Group: FC<GroupsProps> = ({ group }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { mode } = useTabsStore();
    const { userRole } = useAuthStore();

    return (
        <>
            <div className={cls.group}>
                <div className={cls.facultsBlock}>
                    <div className={cls.name}>
                        {group.name}
                    </div>
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div>
            {isOpen && (
                <div className={cls.table}>
                    {userRole === UserRoleEnum.admin && mode === ModeEnum.edit ? (
                        <SheduleTable group={group} />
                        
                    ) : (
                        <SpectateShedule />
                    )}
                     
                </div>

            )}
        </>
    )
}

interface FacultProps {
    facult: IFacultets,
}

const Facult: FC<FacultProps> = ({ facult }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className={cls.group}>
                <div className={cls.facultsBlock}>
                    <div className={cls.name}>
                        {facult.name}
                    </div>
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div>
            {isOpen && facult.courses.map((course) => (
                <Courses course={course} key={course._id} />
            ))}
        </>
    )
}

const FullShedule = () => {
    const { selectedDate } = useDateStore()
    const [facultets, setFacultets] = useState<Array<IFacultets>>([]);

    useEffect(() => {
        getFacultets().then(e => {
            setFacultets(e.facultets)
        })
    }, [])

    return (
        <>
            <Arcticle>

                <div className={cls.title}>
                    <Title>Расписание</Title>
                    <Calendar />
                   
                </div>

                {facultets.map((facult) => (
                    <Facult facult={facult} key={facult._id} />
                ))}
            </Arcticle>
        </>
    );
};

export { FullShedule }