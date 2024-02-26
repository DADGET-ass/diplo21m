import { FC, useState } from 'react';
import { Button } from '@/_views/ui/Button';
import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { IFacultets } from '../index';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';
import { Form } from '@/_views/ui/Form';
import { Courses } from '../Courses';

interface Facultets {
    facultets: IFacultets;
}

const Facultets: FC<Facultets> = ({ facultets }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const facultItem = (
        <>
            <div className={cls.facultsBlock} key={facultets._id} >
                <div className={cls.facultContent}>
                    <div className={cls.name}>
                        {facultets.name}
                    </div>
                    <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                <ArrowIcon />
            </div>
                </div>

            </div>
            {isOpen && facultets.courses.map((course) => (
                <Courses courses={course} key={course._id} />
            ))}

        </>

    );

    return facultItem
}

export { Facultets }