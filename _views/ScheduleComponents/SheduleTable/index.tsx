import React, { useEffect, useState, FC } from 'react';
import dynamic from 'next/dynamic';
import { maxPars } from '@/config';

import cls from './index.module.scss';
import { ITeachers, getDisciplines, getTeachersByDiscipline } from '@/data/api';
import { IDisciplines } from '@/data/api/disciplines/getDisciplines';
import { ITypes, getTypes } from '@/data/api/disciplines/types/getTypes';
import { IAudith, getIAudith } from '@/data/api/audithories/getAudithories';

export interface ScheduleItemProps {
    id: number;
    discipline: string;
    teacher: string;
    type: string;
    audithories: string;
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
    const [teachers, setTeachers] = useState<Array<ITeachers>>();
    const [activeFormDatas, setActiveFormDatas] = useState<{
        activeDiscipline: string,
        activeTeacher: string,
        activeTypes: string,
        activeAudithories: string,
    }>({
        activeDiscipline: '',
        activeTeacher: '',
        activeTypes: '',
        activeAudithories: '',
    });


    const [disciplines, setDisciplines] = useState<IDisciplines[]>([]);
    const [types, setTypes] = useState<ITypes[]>([]);
    const [audithories, setAudithories] = useState<IAudith[]>([]);



    useEffect(() => {
        getIAudith().then(e => {
            setAudithories(e.audithories);
        })
    }, []);

    useEffect(() => {
        getTypes().then(e => {
            setTypes(e.types);
        })
    }, []);

    useEffect(() => {
        getDisciplines().then(e => {
            setDisciplines(e.disciplines);
        })
    }, []);

    useEffect(() => {
        try {
            getTeachersByDiscipline({ id: disciplines.filter((e) => e.name === activeFormDatas.activeDiscipline)[0].id }).then(response => {
                setTeachers(response.teachers);
            });
        } catch (err) {
            console.error(err);
        }
    }, [activeFormDatas.activeDiscipline]);

    const addScheduleItem = () => {
        if (scheduleItems.length > maxPars) {
            return
        }
        const newItem: ScheduleItemProps = {
            id: scheduleItems.length + 1,
            discipline: 'Новая дисциплина',
            teacher: 'Новый преподаватель',
            type: 'Лекция',
            audithories: 'Аудитория 101'
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
                    <div className={cls.name}>Аудитория </div>

                </div>
            </div>
            <div className={cls.tableBody}>
                {scheduleItems.map((item, index) => (
                    <TableRow
                        key={item.id}
                        item={item}
                        index={index}
                        types={types}
                        teachers={teachers}
                        disciplines={disciplines}
                        audithories={audithories}
                        activeFormDatas={activeFormDatas}
                        setActiveFormDatas={setActiveFormDatas}
                    />
                ))}
            </div>
            <button onClick={addScheduleItem}>Добавить занятие</button>
        </div>
    );
};

export { SheduleTable };
