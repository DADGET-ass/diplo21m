import { FC, ReactNode } from "react";
import cls from './index.module.scss';


interface WindowWrapperProps {
    children: ReactNode;
}

const WindowWrapper: FC<WindowWrapperProps> = ({ children }) => {
    return (
        <div className={cls.windowWrapper}>
            {children}
        </div>
    )
}

export { WindowWrapper };