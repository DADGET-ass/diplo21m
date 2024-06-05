import { Arcticle } from '@/_views/ui/Arcticle';
import cls from './index.module.scss';
import { DisciplinesHeader } from './DisciplinesHeader';
import { Disciplines } from './Disciplines';
import { useEffect, useState } from 'react';
import { IDisciplines, getDisciplines } from '@/data/api/disciplines/getDisciplines';
import { Loader } from '@/_views/ui/Loader';

const DisciplinesPage = () => {
    const [disciplines, setDisciplines] = useState<IDisciplines[]>([]);
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    const [trigger, setTrigger] = useState<boolean>(false);
    useEffect(() => {
        getDisciplines().then(e => {
            setDisciplines(e.disciplines);
            setIsLoading(false)
        })
    }, [isOpenPopUp, trigger]);


    const disciplinesPage = (
        <Arcticle>
            <DisciplinesHeader isOpenPopUp={isOpenPopUp} setOpenPopUp={setOpenPopUp} />

            {disciplines && disciplines.length ? (
                <div className={cls.content}>
                    {disciplines?.map((e) => (
                        <Disciplines
                            disciplins={e}
                            key={e.id}
                            setTrigger={setTrigger}
                        />
                    ))}
                </div>
            ) : (
                <>
                    Ничего не найдено
                </>
            )}
        </Arcticle>
    );
    return isLoading ? <div className={cls.loader}><Loader /></div> : disciplinesPage;
};

export { DisciplinesPage }
