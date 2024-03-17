import { FC, useEffect, useState } from 'react';
import cls from './index.module.scss';
import { formatGroup } from '@/utils/formats';
import { validationDefault } from '@/utils/validations';

interface AreaProps {
    label?: string;
    type:
    | "text"
    | "group";
    onChange?: (text: string) => void;
    value?: string;
};


const formatDefault = (text: string) => text;

const typeTextArea = {
    text: {
        type: "text",
        format: formatDefault,
        valid: validationDefault,
    },
    group: {
        type: "text",
        format: formatGroup,
        valid: validationDefault,
    }
};

const TextArea: FC<AreaProps> = ({
    label,
    type,
    onChange,
    value
}) => {
    const [error, setError] = useState<{
        state: boolean,
        code: number,
        value: string,
    }>({
        state: false,
        code: 0,
        value: 'Что-то пошло не так'
    });

    const [currentValue, setCurrentValue] = useState<string>(value || "");
    const TypeInput = typeTextArea[type];
    useEffect(() => {
        setCurrentValue(value || "");
        if (value?.length == 0) {
            setError((prevState) => ({
                ...prevState,
                state: true,
            }));
        }
    }, [value]);
    useEffect(() => {
        onChange && onChange(currentValue);
    }, [currentValue]);

    const textArea = (
        <div className={cls.inputTextArea}>
            {label && (
                <label>{label}</label>
            )}
            <textarea className={cls.textArea}
            value={currentValue}
            onChange={(e) => {
                const text = e.target.value;
                setCurrentValue(typeTextArea[type].format(text));
            }}>

            </textarea>
        </div>

        
    );
    return textArea;

};

export { TextArea };