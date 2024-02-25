import { FC, ReactNode } from 'react';
import cls from './index.module.scss';
import { Button } from '../Button';

interface TitleProps {
    children: ReactNode;
    lightTitle?:boolean;
};


const Title: FC<TitleProps> = ({ children, lightTitle }) => {


    return (
        <div className={cls.title} data-lightTitle={lightTitle? 'true' : ''}>{children}</div>
    );
};

export { Title };