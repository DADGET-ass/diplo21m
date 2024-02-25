import { FC, useEffect, useMemo, useState } from 'react';
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

interface InputProps {
    label?: string;
    type:
    | "phoneNumber"
    | "email"
    | "password"
    | "text";
    autoFocus?: boolean;
    required?: boolean;
    placeholder?: string;
    onChange?: (text: string) => void;
    isValid?: (result: boolean) => void;
    value?: string;
    disabled?: boolean;
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
};

const Input: FC<InputProps> = ({ label, type, autoFocus, required, placeholder, value, disabled }) => {
    const [error, setError] = useState<{
        state: boolean,
        code: number,
        value: string,
    }>({
        state: false,
        code: 0,
        value: 'Что-то пошло не так'
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<string>(value || "");

    useEffect(() => {
        setCurrentValue(value || "");
        if (value?.length == 0) {
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
                        setError((prevState) => ({
                            ...prevState,
                            state: false,
                            value: ''
                        }))
                    }}
                    onBlur={() => {
                        currentValue.length < 1 && required && setError((prevState) => ({
                            ...prevState,
                            state: true,
                            value: 'Поле обязательно'
                        }))
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