import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { useState } from 'react';
import { Arcticle } from '@/_views/ui/Arcticle';

const Disciplines = () => {

    const [isOpen, setOpen] = useState<boolean>(false);

    const disciplines = (
        <Arcticle>
            <div className={cls.disciplinesBlock}>
                <div className={cls.disciplines}>
                    <div className={cls.name}>
                        Веб-программирование
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
    return disciplines;
};

export { Disciplines };