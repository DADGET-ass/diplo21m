import { Arcticle } from "@/_views/ui/Arcticle";
import { Calendar } from "@/_views/ui/Calendar";
import { Title } from "@/_views/ui/Title/Index";
import { IFacultets, getFacultets } from "@/data/api";
import { useDateStore } from "@/data/store/useDateStore";
import { useEffect, useState } from "react";

import cls from './index.module.scss';

const SpectateShedule = () => {

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

                {/* {facultets.map((facult) => (
                    <facult facult={facult} key={facult._id} />
                ))} */}
            </Arcticle>
        </>
    );
};

export {SpectateShedule}

