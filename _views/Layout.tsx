import { FC, PropsWithChildren } from 'react';
import { IMeta } from './seo/meta.interface';
import Meta from './seo/Meta';
import { Header } from './ui/Header';
import { Container } from './ui/Container';
import { LeftSide } from './ScheduleComponents/LeftSide';


const Layout: FC<PropsWithChildren<IMeta>> = ({
    children,
    title,
    description,
    type
}) => {
    return (
        <Meta title={title} description={description}>
            <Header />
            <Container>
                <LeftSide />
                {children}
            </Container>
        </Meta>
    );
};

export default Layout;