import { LeftSide } from '@/_views/ScheduleComponents/LeftSide';
import { Header } from '../Header';
import cls from './index.module.scss';
import { FC, ReactNode } from 'react';
import { Container } from '../Container';

interface LayoutProps{
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return(
        <div className={cls.layout}>
            <Header />
            <Container>
            <LeftSide />
            {children}
            </Container>
        </div>
    );
};

export { Layout };