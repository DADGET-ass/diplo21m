import { FC, ReactNode } from "react"
import cls from "./index.module.scss"


interface ButtonProps {
    children: ReactNode;
    darkBtn?: boolean;
    lightBtn?: boolean;
    onClick?: () => void;
    type?: 'submit' ;
}



const Button: FC<ButtonProps> = ({ children, darkBtn, lightBtn, onClick, type }) => {

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            className={cls.button}
            data-dark={darkBtn ? 'true' : ''}
            data-light={lightBtn ? 'true' : ''}
            onClick={handleClick}
            type={type}
        >
            {children}
        </button>
    );
};

export { Button };