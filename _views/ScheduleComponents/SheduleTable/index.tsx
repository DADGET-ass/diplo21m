import React, { useEffect, useState, FC } from 'react';
import dynamic from 'next/dynamic';
import { maxPars } from '@/config';

import { Input } from '@/_views/ui/Input';
import { DropdownInput } from '@/_views/ui/DropInput';

import { LectionTypeEnum } from '@/data/types/enums';
import { ILection, ITeacher } from '@/data/types/interfaces';

import cls from './index.module.scss';

export interface ScheduleItemProps {
    id: number;
    discipline: string;
    teacher: string;
    type: string;
    room: string;
}

const TableRow = dynamic(
    () =>
        import("@/_views/ScheduleComponents/SheduleTable/TableRow").then(
            (e) => e.TableRow
        ),
    { ssr: false }
);

const SheduleTable = () => {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItemProps[]>([]);
    const [teachers, setTeachers] = useState<Array<ITeacher>>()

    const [lections, setLections] = useState<Array<ILection>>(
        [
            {
                lection: LectionTypeEnum.lection,
                id: '1'
            },
            {
                lection: LectionTypeEnum.practice,
                id: '2'
            },
            {
                lection: LectionTypeEnum.samost,
                id: '3'
            },
        ]
    )

    // useEffect(() => {
    //     try {
    //         getTeachersByDiscipline({ id: disciplines.filter(e => e.id === activeLectionId) }).then(response => {    
    //             const updatedTeachers = response.teachers?.map(teacher => ({
    //                 teacher: teacher,
    //                 id: teacher._id
    //             }));
    //             setTeachers(updatedTeachers);
    //         });
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, [activeLectionId]);

    const addScheduleItem = () => {
        if (scheduleItems.length > maxPars) {
            return
        }
        const newItem: ScheduleItemProps = {
            id: scheduleItems.length + 1,
            discipline: 'Новая дисциплина',
            teacher: 'Новый преподаватель',
            type: 'Лекция',
            room: 'Аудитория 101'
        };

        setScheduleItems([...scheduleItems, newItem]);
    };

    return (

        <div className={cls.tableContainer}>
            <div className={cls.tableHead}>
                <div className={cls.item}>
                    <div className={cls.name}>№</div>
                </div>
                <div className={cls.item}>
                    <div className={cls.name}>Дисциплина</div>
                </div>
                <div className={cls.item}>
                    <div className={cls.name}>Преподаватель</div>
                </div>
                <div className={cls.item}>
                    <div className={cls.name}>ТИП</div>
                </div>
                <div className={cls.item}>
                    <div className={cls.name}>Аудитория</div>
                </div>
            </div>
            <div className={cls.tableBody}>
                {scheduleItems.map((item, index) => (
                    <TableRow item={item} index={index} lections={lections} teachers={teachers} />
                ))}
            </div>
            <button onClick={addScheduleItem}>Добавить занятие</button>
        </div>
    );
};

export { SheduleTable };
