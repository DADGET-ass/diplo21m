import { FC, ReactNode } from 'react';
import cls from './index.module.scss';

interface ContainerProps {
    children: ReactNode;

}

const Container: FC<ContainerProps> = ({ children }) => {
    return (
        <div className={cls.container}>
            {children}
        </div>
    )
}

export { Container };