import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { FC, useEffect, useState } from 'react';
import { Arcticle } from '@/_views/ui/Arcticle';
import { IDisciplines, getDisciplines } from '@/data/api/disciplines/getDisciplines';
import { IAudith } from '@/data/api/audithories/getAudithories';

interface AudithoriesProps {
    audithories: IAudith;
}

const Audithories: FC<AudithoriesProps> = ({ audithories }) => {

 



    const audithorie = (
        <Arcticle>
            <div className={cls.audithoriesBlock}>
                <div className={cls.audithories}>
                    <div className={cls.name}>
                        {audithories.name}
                    </div>
                    <div className={cls.pc}>
                       {audithories.pc ? 'Компьютерная аудитория' : 'Обычная'}
                    </div>
                </div>
               

            </div>
          
        </Arcticle>
    );
    return audithorie;
};

export { Audithories };