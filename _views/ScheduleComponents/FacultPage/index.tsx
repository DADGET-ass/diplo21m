import { FC, useEffect, useState } from 'react';
import { Button } from '@/_views/ui/Button';
import { InnerFacultItem } from './FacultItem';
import cls from './index.module.scss';
import { PopUp } from '@/_views/ui/PopUp';
import { IFacultets, getFacultets } from '@/data/api/getFacultets';

interface FacultsProps {
    isOpenPopUp: boolean;
    facultets: Array<IFacultets>;
}

const Facults:FC<FacultsProps> = ({isOpenPopUp, facultets}) => {

    return (
        <div className={cls.facults}>
            {facultets?.map((facultet) => (
                <InnerFacultItem facultet={facultet} key={facultet._id}/>
            ))}
            
        </div>
    )
}

export { Facults };