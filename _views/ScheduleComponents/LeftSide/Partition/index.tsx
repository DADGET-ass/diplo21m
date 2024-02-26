import { FC, ReactNode, useState } from 'react';
import cls from './index.module.scss';
import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { Facults, facultets } from '../../FacultPage';
import { FacultItem } from '../../FacultPage/FacultItem';
import { FacultsPart } from '../FacultPart';


interface PartitionProps {
    title: string;
    children: ReactNode;
}

const Partition: FC<PartitionProps> = ({ title, children }) => {

    const [isOpen, setOpen] = useState<boolean>(false);

    const partition = (
        <div className={cls.partitionBlock}>
            <div className={cls.part}>
            <div className={cls.name}>
                {title}
            </div>
            <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                <ArrowIcon />
            </div>
            </div>
            
            {isOpen && children}
        </div>
    );
    return partition;
};

export { Partition };