import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { FC, useEffect, useState } from 'react';
import { Arcticle } from '@/_views/ui/Arcticle';
import { IDisciplines, getDisciplines } from '@/data/api/disciplines/getDisciplines';

interface DisciplinesProps{
    disciplins: IDisciplines;
}

const Disciplines: FC<DisciplinesProps> = ({disciplins}) => {
  
    const [isOpen, setOpen] = useState<boolean>(false);



    const discipline = (
        <Arcticle>
            <div className={cls.disciplinesBlock}>
                <div className={cls.disciplines}>
                    <div className={cls.name}>
                        {disciplins.name}
                    </div>
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>

            </div>
            {isOpen && (
                <div className={cls.table}>
                    a
                </div>

            )}
        </Arcticle>
    );
    return discipline;
};

export { Disciplines };