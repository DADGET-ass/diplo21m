import { FC, ReactNode, useState } from 'react';
import Link from 'next/link';

import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { Facults } from '../../FacultPage';
import { FacultsPart } from '../FacultPart';

import cls from './index.module.scss';
import { LeftMenuEnum } from '..';



interface PartitionProps {
    title: string;
    children: ReactNode;
    type: LeftMenuEnum
}

const Partition: FC<PartitionProps> = ({ title, children, type }) => {

    const [isOpen, setOpen] = useState<boolean>(false);

    const partition = (
        <div className={cls.partitionBlock}>
            <div className={cls.part}>

                <Link className={cls.name} href={`/${type}`}>
                    {title}
                </Link>

                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={(e) => { e.stopPropagation(); setOpen(prev => !prev) }}>
                    <ArrowIcon />
                </div>
            </div>

            {isOpen && children}
        </div>
    );
    return partition;
};

export { Partition };