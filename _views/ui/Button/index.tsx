import { FC, ReactNode } from "react"
import cls from "./index.module.scss"


interface ButtonProps {
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({children}) => {
    return(
        <button className={cls.button}>
            {children}
        </button>
    );
};

export { Button };