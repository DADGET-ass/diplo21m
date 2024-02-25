import { FC, ReactNode } from "react"
import cls from "./index.module.scss"


interface ArcticleProps {
    children: ReactNode;
}

const Arcticle: FC<ArcticleProps> = ({ children }) => {
    return (
        <article className={cls.arcticle}>
            {children}
        </article>
    );
};

export { Arcticle };