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
import { Facult } from './Facult';


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