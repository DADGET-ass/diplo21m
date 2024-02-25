import { Dispatch, FC, KeyboardEvent, MouseEvent, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';
import cls from './index.module.scss';
import { Input } from '../Input';
import { CloseIcon } from '../svg_dynamic/base.svg';
import { Button } from '../Button';

interface PopUpProps {
    children?: ReactNode;
    title: string;
    setOpenPopUp: Dispatch<SetStateAction<boolean>>;
}

const PopUp: FC<PopUpProps> = ({ title, setOpenPopUp, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popBlockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.tabIndex = -1;
        setIsOpen(true);

        const handleFocus = (event: FocusEvent) => {
            if (popBlockRef.current && !popBlockRef.current.contains(event.target as Node)) {
                popBlockRef.current.focus();
            }
        };

        document.addEventListener('focus', handleFocus, true);

        return () => {
            document.removeEventListener('focus', handleFocus, true);
        };
    }, []);

    const closeModal = () => {
        setIsOpen(false);
        setTimeout(() => {
            setOpenPopUp(false);
        }, 400);
    };

    const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };
    
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (e.key === 'Escape') {
            closeModal();
        }
    };

    return (
        <div className={`${cls.fade} ${isOpen ? cls.show : ''}`} onClick={closeModal}>
            <div ref={popBlockRef} className={cls.popBlock} onClick={stopPropagation} onKeyDown={handleKeyDown} tabIndex={0}>
                <div className={cls.popTitle}>
                    <span>{title}</span>
                    <button className={cls.closeBtn} onClick={closeModal}>
                        <CloseIcon />
                    </button>
                </div>
                <div className={cls.popContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export { PopUp };
