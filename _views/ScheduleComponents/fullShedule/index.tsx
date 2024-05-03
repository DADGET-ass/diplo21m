import { useState } from 'react';

import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { Arcticle } from '@/_views/ui/Arcticle';
import { SheduleTable } from '../SheduleTable';
import { IFacultets } from '@/data/api';

import cls from './index.module.scss';

interface FacultsProps {
    isOpenPopUp: boolean;
    facultets: Array<IFacultets>;
}

const FullShedule = () => {

    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <Arcticle>
                <div className={cls.group}>
                    <div className={cls.facultsBlock}>
                        <div className={cls.name}>
                            ПКС9-К44
                        </div>
                    </div>
                    <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                        <ArrowIcon />
                    </div>
                </div>
                {isOpen && (
                    <div className={cls.table}>
                        <SheduleTable></SheduleTable>
                    </div>

                )}
            </Arcticle>
        </>
    );
};

export { FullShedule }