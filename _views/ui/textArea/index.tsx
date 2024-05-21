import {
    FC,
    useEffect,
    useState,
    useMemo,
    ChangeEvent,
    Dispatch,
    SetStateAction
} from 'react';
import cls from './index.module.scss';
import { formatGroup } from '@/utils/formats';
import { validationDefault } from '@/utils/validations';
import { CloseIcon } from '../svg_dynamic/base.svg';

interface AreaProps {
    label?: string;
    type: "text" | "group";
    onChange?: (text: string) => void;
    value?: string;
    pre?: string;
    setGroupsArray: Dispatch<SetStateAction<string[]>>
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
    value,
    pre,
    setGroupsArray
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
    const [words, setWords] = useState<string[]>([]);
    const TypeInput = typeTextArea[type];

    useEffect(() => {
        setCurrentValue(value || "");
        if (value?.length === 0) {
            setError((prevState) => ({
                ...prevState,
                state: true,
            }));
        }
    }, [value]);

    useEffect(() => {
        if (onChange) {
            onChange(currentValue);
        }
    }, [currentValue]);

    const WordsRows = useMemo(() => {
        return words.map((word, index) => (
            <div className={cls.word} key={index}>
                {word}
                <div className={cls.svg}
                    onClick={() => {
                        setWords((prevWords) => prevWords.filter((_, i) => i !== index));
                    }}
                >
                    <CloseIcon />
                </div>
            </div>
        ));
    }, [words]);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setCurrentValue(text);
        if (text.endsWith(' ') && text.trim().length > (pre ? pre.length : 0)) {
            setWords((prevWords) => [...prevWords, text.trim().toUpperCase()]);
            setCurrentValue('');
        }
    };

    useEffect(() => {
        setGroupsArray(words)
    }, [words])

    return (
        <div className={cls.inputTextArea}>
            {label && (
                <label>{label}</label>
            )}
            <div>
                {WordsRows}
                <textarea
                    className={cls.textArea}
                    value={currentValue ? currentValue : pre ? pre + currentValue : currentValue}
                    onChange={handleTextChange}
                />
            </div>
        </div>
    );
};

export { TextArea };
