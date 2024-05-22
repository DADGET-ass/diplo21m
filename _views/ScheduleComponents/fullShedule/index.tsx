import { useEffect, useState } from 'react';

import { Arcticle } from '@/_views/ui/Arcticle';
import { IFacultets, getFacultets } from '@/data/api';
import { Title } from '@/_views/ui/Title/Index';
import { Calendar } from '@/_views/ui/Calendar';
import { Facult } from './Facult';

import cls from './index.module.scss';


const FullShedule = () => {
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
                <div className={cls.content}>
                    {facultets.map((facult) => (
                        <Facult facult={facult} key={facult._id} />
                    ))}
                </div>
            </Arcticle>
        </>
    );
};

export { FullShedule }