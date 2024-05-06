import { Dispatch, SetStateAction, useState, FC } from 'react';

import { Input } from '../Input';
import { ArrowIcon } from '../svg_dynamic/base.svg';

import cls from './index.module.scss';

interface DropdownInputProps {
    list: string[];
    value: string;
    setActiveValue: (value: string) => void;
}

const DropdownInput: FC<DropdownInputProps> = ({ value, setActiveValue, list }) => {
    const [focus, setFocus] = useState<boolean>(false);

    const highlightMatch = (text: string, searchQuery: string) => {
        const lowerText = text?.toLowerCase();
        const lowerSearchQuery = searchQuery.toLowerCase();

        if (!searchQuery || !lowerText?.includes(lowerSearchQuery)) {
            return <span>{text}</span>;
        }

        const startIdx = lowerText.indexOf(lowerSearchQuery);
        const endIdx = startIdx + searchQuery.length;

        return (
            <span>
                {text.substring(0, startIdx)}
                <span className={cls.highlight}>{text.substring(startIdx, endIdx)}</span>
                {text.substring(endIdx)}
            </span>
        );
    };

    const dropDownInput = (
        <div className={cls.dropdown}>
            <div className={cls.input}>
                <Input
                    type='text'
                    value={value}
                    onChange={(currentValue) => setActiveValue(currentValue)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
            </div>
            {list.filter((e) => e.toLowerCase().includes(value.toLowerCase())).length > 0 && (
                <div className={cls.drop} data-focus={setFocus}>
                    {list.filter((e) => e.toLowerCase().includes(value.toLowerCase())).map((item, index) => (
                        <p key={index} onClick={() => setActiveValue(item)}>{highlightMatch(item, value)}</p>
                    ))}
                </div>
            )}
        </div>
    )

    return dropDownInput;
};

export { DropdownInput }
