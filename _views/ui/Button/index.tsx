import { FC, ReactNode } from "react"
import cls from "./index.module.scss"


interface ButtonProps {
    children: ReactNode;
    darkBtn?: boolean;
    lightBtn?: boolean;
    onClick?: () => void;
    type?: 'submit' | 'button';
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
            <span>
                {children}
            </span>

        </button>
    );
};

export { Button };