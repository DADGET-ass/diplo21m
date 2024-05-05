import { Arcticle } from '@/_views/ui/Arcticle';
import cls from './index.module.scss';
import { DisciplinesHeader } from './DisciplinesHeader';
import { Disciplines } from './Disciplines';
import { useEffect, useState } from 'react';
import { IDisciplines, getDisciplines } from '@/data/api/disciplines/getDisciplines';

const DisciplinesPage = () =>{
    const [disciplines, setDisciplines] = useState<IDisciplines[]>([]);
    useEffect(() => {
        getDisciplines().then(e =>{
            setDisciplines(e.disciplines);
        })
    },[]);
    
    const disciplinesPage =(
        <Arcticle>
            <DisciplinesHeader />
            
            {disciplines && disciplines.length ? (
                <div className={cls.content}>
                    {disciplines?.map((e) => (
                        <Disciplines disciplins={e} key={e._id} />
                    ))}
                </div>
            ) : (
                <>
                    Ничего не найдено
                </>
            )}
        </Arcticle>
    );
    return disciplinesPage;
};

export {DisciplinesPage}