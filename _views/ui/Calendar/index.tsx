import { useRouter } from 'next/router';
import { FC, useState, useEffect, useRef, SetStateAction, Dispatch } from 'react';

import { useDateStore } from '@/data/store/useDateStore';
import { Button } from '../../ui/Button';

import cls from './index.module.scss';
import { ArrowDownIcon, CalendarIcon } from '../svg_dynamic/base.svg';

interface CalendarFrameProps {
    setOpenCalendar: Dispatch<SetStateAction<boolean>>,
    selectDate?: Dispatch<SetStateAction<string>>,
    full?: boolean;
}

const CalendarFrame: FC<CalendarFrameProps> = ({ setOpenCalendar, full, selectDate }) => {

    const { today, date, selectedDate, setSelectedDate, moveMonth } = useDateStore();
    const [localSelectedDate, setLocalSelectedDate] = useState<Date>(selectedDate);
    const currentDate = new Date(date);
    const { pathname } = useRouter();
    const calendarRef = useRef<HTMLDivElement>(null);

    const handleClickOutsideSidebar = (event: MouseEvent) => {
        if (
            calendarRef.current &&
            !calendarRef.current.contains(event.target as Node)
        ) {
            setOpenCalendar(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideSidebar);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideSidebar);
        };
    }, []);

    const weekdays = [
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
        'Воскресенье',
    ]

    const getDaysArray = (currentMonth: number, currentYear: number) => {
        const numDays = daysInMonth(currentMonth, currentYear);
        const daysArray = Array.from({ length: numDays }, (_, i) => i + 1);

        return { daysArray };
    };

    const handleSetDate = () => {
        selectDate && selectDate(localSelectedDate.toLocaleDateString('ru-Ru', { day: "2-digit", month: "2-digit", year: "numeric" }).replaceAll('/', '.'));
        setSelectedDate(localSelectedDate);
        setOpenCalendar(false);
    }

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const handleDateClick = (date: Date) => {
        setLocalSelectedDate(date);
    };

    const handlePrevMonth = () => {
        moveMonth(-1);
    };

    const handleNextMonth = () => {
        moveMonth(1);
    };

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const numDays = daysInMonth(currentMonth, currentYear);

    const todayDate = new Date(today);
    const { daysArray } = getDaysArray(currentMonth, currentYear);

    daysArray.splice(0, daysArray.length);

    const firstDayOfMonth = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7;
    if (firstDayOfMonth !== 0) {
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const prevMonthDays = daysInMonth(prevMonth, prevYear);
        const prevMonthStartIndex = prevMonthDays - firstDayOfMonth + 1;

        for (let i = prevMonthStartIndex; i <= prevMonthDays; i++) {
            daysArray.push(i);
        }
    }

    for (let i = 1; i <= numDays; i++) {
        daysArray.push(i);
    }

    const calendarFrame = (
        <div className={cls.calendar} ref={calendarRef}>
            <div className={cls.controls}>
                <button className={cls.arrowButton} onClick={handlePrevMonth}>
                    <ArrowDownIcon />
                </button>
                <h2 className={cls.currentMonth}>{currentDate.toLocaleString('ru-Ru', { month: 'long' })} {currentYear}</h2>
                <button className={cls.arrowButton} onClick={handleNextMonth}>
                    <ArrowDownIcon />
                </button>
            </div>
            <div className={cls.gride}>
                {weekdays.map((weekday, index) => (
                    <div className={cls.hcell} key={index}>
                        {weekday}
                    </div>
                ))}
                {daysArray.map((day, index) => {
                    const dateToCheck = new Date(currentYear, currentMonth, day);
                    const isDateUnavailable = (index >= 0 && index <= 6 && day > 7) || !full && dateToCheck < new Date(Date.now() - 1000 * 60 * 60 * 24 * 10);
                    const isActive = dateToCheck.toLocaleDateString() === localSelectedDate.toLocaleDateString();
                    return (
                        <div key={index}
                            className={`${cls.cell} ${isDateUnavailable ? cls.unavailable : ''} ${isActive && !isDateUnavailable ? cls.active : ''}`}
                            onClick={() => !isDateUnavailable && handleDateClick(dateToCheck)}>
                            {day}
                        </div>
                    );
                })}
            </div>
            <div className={cls.todayBlock}>
                <p>
                    Сегодня
                </p>
                <span>{new Date()?.toLocaleDateString('ru-Ru', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
            </div>
            <hr />
            <div className={cls.buttonsWrapper}>
                <Button onClick={() => { setOpenCalendar(false); setLocalSelectedDate(selectedDate) }}>
                    Отменить
                </Button>
                <Button onClick={handleSetDate}>
                    Показать
                </Button>
            </div>
        </div>
    );
    return calendarFrame;
};

export { CalendarFrame }

const Calendar: FC = () => {
    const { selectedDate } = useDateStore();
    const [isOpenCalendar, setOpenCalendar] = useState<boolean>(false);

    const handleOpenCalendar = () => {
        setOpenCalendar(prev => !prev);
    }

    return (
        <div className={cls.wrapper}>
            <button className={isOpenCalendar ? `${cls.toggleButton} ${cls.active}` : cls.toggleButton} onClick={handleOpenCalendar}>
                <CalendarIcon />
                <span>
                    {selectedDate === new Date() ?
                        'Сегодня' :
                        selectedDate.toLocaleDateString('ru-Ru', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
            </button>
            {isOpenCalendar && (
                <CalendarFrame setOpenCalendar={setOpenCalendar} />
            )}
        </div>
    );
};

export { Calendar };