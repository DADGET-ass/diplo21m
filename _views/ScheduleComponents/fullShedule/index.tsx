import { useEffect, useState } from 'react';

import { Arcticle } from '@/_views/ui/Arcticle';
import { IFacultets, getFacultets } from '@/data/api';
import { Title } from '@/_views/ui/Title/Index';
import { Calendar } from '@/_views/ui/Calendar';
import { Facult } from './Facult';

import cls from './index.module.scss';
import { Loader } from '@/_views/ui/Loader';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';
import { Button } from '@/_views/ui/Button';
import { autoGen } from '@/data/api/fullShedule/autoGen';
import { useDateStore } from '@/data/store/useDateStore';


const FullShedule = () => {

    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()
    const { selectedDate } = useDateStore();

    const [facultets, setFacultets] = useState<Array<IFacultets>>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFacultets().then(e => {
            setFacultets(e.facultets)
            setIsLoading(false)
        })
    }, [])

    const autoGenShedule = () => {
        autoGen({ year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1 }).then(e => {
            setIsLoading(true);
            if (e.message) {
                setIsLoading(false);
            }
        })
    }

    return isLoading ? <div className={cls.loader}><Loader /></div> : (
        <>
            <Arcticle>
                <div className={cls.title}>
                    <Title>Расписание</Title>
                    {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                        <Button darkBtn onClick={autoGenShedule}>Создать на месяц</Button>
                    )}
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