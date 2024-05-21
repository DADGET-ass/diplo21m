import { FC, ReactNode } from 'react';
import cls from './index.module.scss';


interface CheckboxProps {
    children: ReactNode;
    checked: boolean;
    value: string;
    name: string;
    left?: boolean;
    onChange: (e: any) => void;
    square?: boolean;
    between?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ 
    children, 
    checked, 
    value, 
    name, 
    left,
    onChange,
    square,
    between,
}) => {    
    const checkbox = (
        <label className={cls.checkbox} htmlFor={name} onClick={onChange} data-between={between}>
            { left && children }
            <input className={cls.realCheckbox} 
                checked={checked} 
                type='checkbox' 
                name={name} 
                value={value} 
                readOnly
            />
            <span className={cls.customCheckbox} data-square={square}></span>
            { !left && children }
        </label>
    );

    return checkbox;
};

export { Checkbox };