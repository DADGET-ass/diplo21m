import { FC, useEffect, useState, MutableRefObject, Dispatch, SetStateAction, FormEvent } from 'react';
import dynamic from 'next/dynamic';

import { ITeachers, getDisciplines, getTeachersByDiscipline } from '@/data/api';
import { maxPars } from '@/config';
import { IDisciplines } from '@/data/api/disciplines/getDisciplines';
import { ITypes, getTypes } from '@/data/api/disciplines/types/getTypes';
import { IAudith, getIAudith } from '@/data/api/audithories/getAudithories';
import { IShedule, getShedule } from '@/data/api/fullShedule/getShedule';
import { Button } from '@/_views/ui/Button';
import { AddShedulePayload, IItems, addShedule } from '@/data/api/fullShedule/addShedule';
import { useDateStore } from '@/data/store/useDateStore';
import { IGroupsFacult } from '@/data/api/facultets/getFacultets';

import cls from './index.module.scss';
import { Form } from '@/_views/ui/Form';
import { editShedule } from '@/data/api/fullShedule/editShedule';

const TableRow = dynamic(
    () =>
        import("@/_views/ScheduleComponents/SheduleTable/TableRow").then(
            (e) => e.TableRow
        ),
    { ssr: false }
);

const TableRowWithTeachers: FC<{
    item: IItems,
    index: number,
    types: ITypes[],
    disciplines: IDisciplines[],
    audithories: IAudith[],
    activeFormDatas: IItems,
    setActiveFormDatas: React.Dispatch<React.SetStateAction<IItems[]>>
    teachers: Array<ITeachers>;
    setTeachers: Dispatch<SetStateAction<Array<ITeachers>>>;
}> = ({
    item,
    index,
    types,
    disciplines,
    audithories,
    activeFormDatas,
    setActiveFormDatas,
    teachers,
    setTeachers
}) => {
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
        }, [item.discipline, disciplines]);

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
    tableRef: MutableRefObject<HTMLDivElement | null>;

}

const SheduleTable: FC<SheduleTableProps> = ({ group, tableRef }) => {
    const [scheduleItems, setScheduleItems] = useState<IItems[]>([]);
    const [scheduleItemsId, setScheduleItemsId] = useState<IItems[]>([]);
    const [teachers, setTeachers] = useState<Array<ITeachers>>([]);
    const { selectedDate } = useDateStore();
    const [trigger, setTrigger] = useState<boolean>(false);
    const [scheduleId, setScheduleId] = useState<string>('');


    const [disciplines, setDisciplines] = useState<IDisciplines[]>([]);
    const [types, setTypes] = useState<ITypes[]>([]);
    const [audithories, setAudithories] = useState<IAudith[]>([]);
    const [schedule, setSchedule] = useState<IShedule[]>([]);
    const [serverMessage, setServerMessage] = useState<string>();
    const [addShedulePayload, setAddShedulePayload] = useState<AddShedulePayload>();

    useEffect(() => {
        getShedule({ date: selectedDate.toISOString().slice(0, 10), group: group._id }).then(response => {
            if (response.schedule) {
                setScheduleItems(response.schedule[0].items.map(e => ({ discipline: e.discipline.name, audithoria: e.audithoria.name, number: e.number, teacher: `${e.teacher.surname} ${e.teacher.name} ${e.teacher.patronymic}`, type: e.type.name })));
                setScheduleId(response.schedule[0]._id)
            }
            if (response.message) {
                setScheduleItems([])
            }
        });
    }, [selectedDate]);

    useEffect(() => {
        setAddShedulePayload({ group: group._id, date: selectedDate.toLocaleDateString('ru-Ru', { year: 'numeric', month: '2-digit', day: '2-digit' }), items: scheduleItems });
    }, [group, selectedDate, scheduleItems]);

    console.log(scheduleItemsId)

    useEffect(() => {
        const updatedItems = scheduleItems.map(item => {
            const audithoriaId = audithories?.find(audithoria => audithoria.name === item.audithoria.split(' ')[0])?._id || '';
            const disciplineId = disciplines?.find(discipline => discipline.name === item.discipline)?.id || '';
            const typeId = types?.find(type => type.name === item.type)?._id || '';
            const teacherId = teachers?.find(teacher => teacher.surname === item.teacher.split(' ')[0])?._id || '';
            return { ...item, audithoria: audithoriaId, teacher: teacherId, type: typeId, discipline: disciplineId };
        });

        setScheduleItemsId(updatedItems);

    }, [scheduleItems, audithories, trigger, teachers]);



    useEffect(() => {
        getIAudith().then(e => {
            setAudithories(e.audithories);
        });
    }, []);

    useEffect(() => {
        getTypes().then(e => {
            setTypes(e.types);
        });
    }, []);

    useEffect(() => {
        getDisciplines({ groupId: group._id }).then(e => {
            setDisciplines(e.disciplines);
        });
    }, []);

    const addScheduleItem = () => {
        if (scheduleItems.length > maxPars) {

            return;
        }

        const newItem: IItems = {
            discipline: '',
            teacher: '',
            type: '',
            audithoria: '',
            number: scheduleItems.length + 1
        };

        setScheduleItems([...scheduleItems, newItem]);
    };

    const deleteScheduleItem = () => {
        if (scheduleItems.length === 0) {
            return;
        }

        const updatedScheduleItems = [...scheduleItems];
        updatedScheduleItems.pop();

        setScheduleItems(updatedScheduleItems);
    };

    const editScheduleItem = () => {
        editShedule({ id: scheduleId, date: selectedDate.toISOString().slice(0, 10), group: group._id, items: scheduleItemsId }).then(response => {
            setServerMessage(response.message || '');

            return;
        });
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        addShedule({ date: selectedDate.toISOString().slice(0, 10), group: group._id, items: scheduleItemsId }).then(response => {
            setServerMessage(response.message || '');

            return;
        });

    };

    return (
        <div className={cls.tableContainer} ref={tableRef} >
            <Form onSubmit={onSubmit}>
                <Button darkBtn type='submit'>Создать</Button>
                <div className={cls.btn}>
                    <Button darkBtn onClick={addScheduleItem} type='button'>Добавить занятие</Button>
                    <Button darkBtn onClick={editScheduleItem} type='button'>Сохранить изменения</Button>
                    <Button darkBtn onClick={deleteScheduleItem} type='button'>Удалить занятие</Button>
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
                        <div className={cls.name}>Аудитория</div>
                    </div>
                </div>
                <div className={cls.tableBody} >
                    {scheduleItems.map((item, index) => (
                        <TableRowWithTeachers
                            key={index}
                            item={item}
                            index={index}
                            types={types}
                            teachers={teachers}
                            setTeachers={setTeachers}
                            disciplines={disciplines}
                            audithories={audithories}
                            activeFormDatas={scheduleItems.filter((e) => e.number === item.number)[0]}
                            setActiveFormDatas={setScheduleItems}
                        />
                    ))}
                    {serverMessage && (
                        <p>{serverMessage}</p>
                    )}
                </div>
            </Form>
        </div>
    );
};

export { SheduleTable };
