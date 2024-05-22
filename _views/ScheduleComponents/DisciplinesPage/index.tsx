import { Arcticle } from '@/_views/ui/Arcticle';
import cls from './index.module.scss';
import { DisciplinesHeader } from './DisciplinesHeader';
import { Disciplines } from './Disciplines';
import { useEffect, useState } from 'react';
import { IDisciplines, getDisciplines } from '@/data/api/disciplines/getDisciplines';
import { deleteDisciplines } from '@/data/api/disciplines/deleteDisciplines';

const DisciplinesPage = () =>{
    const [disciplines, setDisciplines] = useState<IDisciplines[]>([]);
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [trigger, setTrigger] = useState<boolean>(false);
    useEffect(() => {
        getDisciplines({id:''}).then(e =>{
            setDisciplines(e.disciplines);
        })
    },[isOpenPopUp, trigger]);

    
    const disciplinesPage =(
        <Arcticle>
            <DisciplinesHeader isOpenPopUp={isOpenPopUp} setOpenPopUp={setOpenPopUp}/>
            
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
    return disciplinesPage;
};

export {DisciplinesPage}