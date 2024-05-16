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

interface SheduleTableProps {
    group: IGroupsFacult;
}

const SheduleTable: FC<SheduleTableProps> = ({ group }) => {
    const [scheduleItems, setScheduleItems] = useState<ScheduleItemProps[]>([]);
    const [scheduleItemsId, setScheduleItemsId] = useState<ScheduleItemProps[]>([]);
    const [teachers, setTeachers] = useState<Array<ITeachers>>();
    const { selectedDate } = useDateStore();

    const [disciplines, setDisciplines] = useState<IDisciplines[]>([]);
    const [types, setTypes] = useState<ITypes[]>([]);
    const [audithories, setAudithories] = useState<IAudith[]>([]);
    const [schedule, setSchedule] = useState<IShedule[]>([]);

    const [addShedule, setAddShedule] = useState<IAddShedule>();

    useEffect(() => {
        setAddShedule({ group: group._id, date: selectedDate.toLocaleDateString('ru-Ru', { year: 'numeric', month: '2-digit', day: '2-digit' }), items: scheduleItems });
    }, [group, selectedDate, scheduleItems])

    useEffect(() => {
        const updatedItems = scheduleItems.map(item => {
            const audithoriaId = audithories?.find(audithoria => audithoria.name === item.audithoria)?._id || '';
            const disciplineId = disciplines?.find(discipline => discipline.name === item.discipline)?.id || '';
            const typeId = types?.find(type => type.name === item.type)?._id || '';
            if (teachers) {
                const teacherId = teachers?.find(teacher => teacher.name === item.teacher)?._id || '';
            }
            return { ...item, audithoria: audithoriaId };
        });
        setScheduleItemsId(updatedItems);
    }, [scheduleItems, audithories]);

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
        getDisciplines({ id: group._id }).then(e => {
            setDisciplines(e.disciplines);
        })
    }, []);

    const addScheduleItem = () => {
        if (scheduleItems.length > maxPars) {
            return
        }
        const newItem: ScheduleItemProps = {
            discipline: '',
            teacher: '',
            type: '',
            audithoria: '',
            number: scheduleItems.length
        };

        setScheduleItems([...scheduleItems, newItem]);
    };

    console.log(scheduleItemsId)

    return (

        <div className={cls.tableContainer}>
            <div className={cls.btn}>
                <Button darkBtn onClick={addScheduleItem}>Добавить занятие</Button>
                <Button darkBtn>Создать</Button>
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

                {scheduleItems.map((item, index) => (
                    <TableRowWithTeachers
                        key={index}
                        item={item}
                        index={index}
                        types={types}
                        disciplines={disciplines}
                        audithories={audithories}
                        activeFormDatas={scheduleItems.filter((e) => e.number === item.number)[0]}
                        setActiveFormDatas={setScheduleItems}
                    />
                ))}
            </div>


        </div>
    );
};

export { SheduleTable };
