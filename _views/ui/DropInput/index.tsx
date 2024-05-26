import {
    Dispatch,
    SetStateAction,
    useState,
    FC,
    useMemo,
    ChangeEvent,
    useEffect,
    useRef
} from 'react';

import { Input } from '../Input';
import { ArrowIcon } from '../svg_dynamic/base.svg';
import { CloseIcon } from '../svg_dynamic/base.svg';

import cls from './index.module.scss';

interface DropdownInputProps {
    label?: string;
    list: string[];
    setArray?: Dispatch<SetStateAction<string[]>>,
    value?: string;
    setActiveValue?: (value: string) => void;
}

const DropdownInput: FC<DropdownInputProps> = ({
    list,
    label,
    setArray,
    value,
    setActiveValue
}) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [words, setWords] = useState<string[]>([]);
    const [currentValue, setCurrentValue] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

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
                <span className={cls.highlight}>{text.substring(startIdx, endIdx)}a</span>
                {text.substring(endIdx)}
            </span>
        );
    };

    const WordsRows = useMemo(() => {
        return words.map((word, index) => (
            <div className={cls.word} key={index}>
                {`${word.split(' ')[0]} ${word.split(' ')[1] ? word.split(' ')[1].slice(0, 1) + '.' : ''} ${word.split(' ')[2] ? word.split(' ')[2].slice(0, 1) + '.' : ''} `}
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
        if (text.endsWith(' ') && text.trim().length > 0) {
            setCurrentValue('');
        }
    };

    useEffect(() => {
        setArray && setArray(words);
    }, [words, setArray]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setFocus(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    const dropDownInput = (
        <div className={cls.dropdown} ref={dropdownRef}>
            {label && (
                <label>{label}</label>
            )}
            <div className={cls.input}>
                {WordsRows}
                <textarea name="drop"
                    value={value ? value : currentValue}
                    onChange={(e) => setActiveValue ? setActiveValue(e.target.value) : handleTextChange}
                    onFocus={() => setFocus(true)}
                />
            </div>
            {list.filter((e) => e.toLowerCase().includes(value ? value.toLowerCase() : currentValue?.toLowerCase())).length > 0 && (
                <div className={cls.drop} data-focus={focus}>
                    {list.filter((e) => e.toLowerCase().includes(value ? value.toLowerCase() : currentValue.toLowerCase()) && !words.includes(e)).map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (setActiveValue) {
                                    setActiveValue(item);
                                    return
                                }
                                setWords((prevWords) => [...prevWords, item.trim()]);
                                setCurrentValue('');
                            }}
                        >
                            {highlightMatch(item, value ? value : currentValue)}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return dropDownInput;
};

export { DropdownInput }
