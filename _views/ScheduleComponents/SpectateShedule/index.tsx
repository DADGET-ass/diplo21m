import {
    useEffect,
    useState,
    FC
} from 'react';
import dynamic from 'next/dynamic';

import { ITeachers, getDisciplines, getTeachersByDiscipline } from '@/data/api';
import { maxPars } from '@/config';
import { IDisciplines } from '@/data/api/disciplines/getDisciplines';
import { ITypes, getTypes } from '@/data/api/disciplines/types/getTypes';
import { IAudith, getIAudith } from '@/data/api/audithories/getAudithories';
import { IShedule, getShedule } from '@/data/api/fullShedule/getShedule';
import { Button } from '@/_views/ui/Button';
import { IAddShedule } from '@/data/api/fullShedule/addShedule';
import { IGroups } from '@/data/api';
import { useDateStore } from '@/data/store/useDateStore';

import cls from './index.module.scss';
import { IGroupsFacult } from '@/data/api/facultets/getFacultets';

export interface ScheduleItemProps {
    discipline: string;
    teacher: string;
    type: string;
    audithoria: string;
    number: number
}


const TableRow = dynamic(
    () =>
        import("@/_views/ScheduleComponents/SheduleTable/TableRow").then(
            (e) => e.TableRow
        ),
    { ssr: false }
);

const TableRowWithTeachers: FC<{
    item: ScheduleItemProps,
    index: number,
    types: ITypes[],
    disciplines: IDisciplines[],
    audithories: IAudith[],
    activeFormDatas: ScheduleItemProps,
    setActiveFormDatas: React.Dispatch<React.SetStateAction<ScheduleItemProps[]>>
}> = ({ item, index, types, disciplines, audithories, activeFormDatas, setActiveFormDatas }) => {
    const [teachers, setTeachers] = useState<ITeachers[]>([]);
    const { selectedDate } = useDateStore()

    useEffect(() => {
        try {
            getTeachersByDiscipline({
                id: disciplines.filter((e) => e.name === item.discipline)[0].id,
                date: selectedDate.toISOString().slice(0, 10)
            }).then(response => {
                setTeachers(response.teachers);
            });
        } catch (err) {
            console.error(err);
        }
    }, [item.discipline]);

    return (
        <TableRow
            key={item.number}
            item={item}
            index={index}
            types={types}
            teachers={teachers}
            disciplines={disciplines}
            audithories={audithories}
            activeFormDatas={activeFormDatas}
            setActiveFormDatas={setActiveFormDatas}
        />
    );
};

interface SpectateSheduleProps {
    group: IGroupsFacult;
}

const SpectateShedule: FC<SpectateSheduleProps> = ({ group }) => {

    const [shedule, setShedule] = useState<Array<IShedule>>([]);

    useEffect(() => {
        getShedule().then(response => {
            if (response.shedule) {
                setShedule(response.shedule);
            }
        });
    }, []);

    return (

        <div className={cls.tableContainer}>
            <div className={cls.btn}>

            </div>
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
                {shedule.length > 0 ? (
                    <div>
                        {shedule.map((item) => (
                            <div key={item.id}>
                                {/* Отображаем дату расписания */}
                                <h3>{item.date.toString()}</h3>
                                {/* Отображаем элементы расписания */}
                                {item.items.map((scheduleItem) => (
                                    <div key={scheduleItem._id}>
                                        {/* Отображаем свойства элемента расписания */}
                                        <p>Дисциплина: {scheduleItem.discipline.name}</p>
                                        <p>Преподаватель: {scheduleItem.teacher.name}</p>
                                        <p>Тип: {scheduleItem.type.name}</p>
                                        <p>Аудитория: {scheduleItem.audithories.name}</p>
                                        <p>Номер: {scheduleItem.number}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Расписание загружается...</p>
                )}
            </div>
        </div>
    );
};

export { SpectateShedule }
