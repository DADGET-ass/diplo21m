import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
    formatPhoneNumber,
} from '@/utils/formats'
import {
    validationPhone,
    validationEmail,
    validationPassword,
    validationDefault,
} from "@/utils/validations";
import cls from './index.module.scss';
import { EyeCloseIcon, EyeIcon } from '../svg_dynamic/base.svg';
import { formatGroup } from '@/utils/formats/formatGroup';

interface InputProps {
    label?: string;
    type:
    | "phoneNumber"
    | "email"
    | "password"
    | "text"
    | "group"
    | "number";
    autoFocus?: boolean;
    required?: boolean;
    placeholder?: string;
    onChange?: (text: string) => void;
    isValid?: (result: boolean) => void;
    value?: string;
    disabled?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}

const formatDefault = (text: string) => text;


const typeInput = {
    phoneNumber: {
        type: "phone",
        format: formatPhoneNumber,
        valid: validationPhone,
    },
    email: {
        type: "email",
        format: formatDefault,
        valid: validationEmail,
    },
    password: {
        type: "password",
        format: formatDefault,
        valid: validationPassword,
    },
    text: {
        type: "text",
        format: formatDefault,
        valid: validationDefault,
    },
    group: {
        type: "text",
        format: formatGroup,
        valid: validationDefault,
    },
    number: {
        type: "number",
        format: formatDefault,
        valid: validationDefault,
    },
  
};

const Input: FC<InputProps> = ({
    label,
    type,
    autoFocus,
    required,
    placeholder,
    value,
    disabled,
    onChange,
    isValid,
    onFocus,
    onBlur,
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
    const inputRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<string>(value || "");
    const [checked, setChecked] = useState<Boolean>(false);
    const TypeInput = typeInput[type];

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        onChange && onChange(currentValue);
    }, [currentValue]);

    useEffect(() => {
        setCurrentValue(value || "");
        if (autoFocus && value?.length == 0) {
            setError((prevState) => ({
                ...prevState,
                state: true,
            }));
        }
    }, [value]);

    const inputId = useMemo(() => Math.random().toString(36).substring(7), []);



    const input = (
        <div className={cls.inputWrapper}>
            {label && (
                <label htmlFor={inputId} data-disabled={disabled}>{label}</label>
            )}
            <div className={cls.input}>

                <input
                    id={inputId}
                    autoFocus={autoFocus}
                    placeholder={placeholder}
                    required={required}
                    type={showPassword ? "text" : typeInput[type].type}
                    value={currentValue}
                    data-error={error.state === true ? 'true' : ''}
                    onChange={(e) => {
                        const text = e.target.value;
                        setCurrentValue(typeInput[type].format(text));
                    }}
                    disabled={disabled}
                    onFocus={() => {
                        onFocus && onFocus();
                    }}
                    onBlur={() => {
                        onBlur && onBlur();
                    }}
                />
          


                {type === 'password' && currentValue.length > 0 && (
                    <div className={cls.eye} onMouseDown={() => setShowPassword(true)} onMouseUp={() => setShowPassword(false)} onMouseLeave={() => setShowPassword(false)}>
                        {!showPassword ? <EyeCloseIcon /> : <EyeIcon />}
                    </div>
                )}
                {error.state && (
                    <span className={cls.error}>
                        {error.value}
                    </span>
                )}
            </div>
        </div>
    );
    return input
};

export { Input }