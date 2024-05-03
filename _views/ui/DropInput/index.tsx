import { ArrowIcon } from '../svg_dynamic/base.svg';
import cls from './index.module.scss';
import React, { Dispatch, SetStateAction, useState } from 'react';


interface DropdownInputProps {
    options: Array<{
        item: string,
        id: string
    }>;
    active: string;
    setSelectedOption: Dispatch<SetStateAction<string>>
}

const DropdownInput: React.FC<DropdownInputProps> = ({ options,
    active,
    setSelectedOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const dropDownInput = (
        <div className={cls.dropdown}>
            <p>{active}</p>
            <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={handleToggle}>
                <ArrowIcon />
            </div>
            {isOpen && (
                <div className={cls.options}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={cls.option}
                            onClick={() => handleOptionClick(option.id)}
                        >
                            {option.item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

    return options ? dropDownInput : null;
};

export { DropdownInput }
