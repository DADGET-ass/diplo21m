import {
    useEffect,
    useState,
    FC,
    MutableRefObject,
    FormEvent
} from 'react';
import dynamic from 'next/dynamic';

import { ITeachers, getTeachersByDiscipline } from '@/data/api';
import { IDisciplines } from '@/data/api/disciplines/getDisciplines';
import { ITypes } from '@/data/api/disciplines/types/getTypes';
import { IAudith } from '@/data/api/audithories/getAudithories';
import { IShedule, getShedule } from '@/data/api/fullShedule/getShedule';
import { useDateStore } from '@/data/store/useDateStore';
import { IGroupsFacult } from '@/data/api/facultets/getFacultets';

import cls from './index.module.scss';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';
import { Button } from '@/_views/ui/Button';
import { PopUp } from '@/_views/ui/PopUp';
import { Form } from '@/_views/ui/Form';
import { Input } from '@/_views/ui/Input';
import { editShedule } from '@/data/api/fullShedule/editShedule';
import { IItems } from '@/data/api/fullShedule/addShedule';

export interface ScheduleItemProps {
    discipline: string;
    teacher: string;
    type: string;
    audithoria: string;
    number: number
}

interface SpectateSheduleProps {
    group: IGroupsFacult;
    tableRef: MutableRefObject<HTMLDivElement | null>;
    // items: IItems
}

const SpectateShedule: FC<SpectateSheduleProps> = ({ group, tableRef }) => {
    const { selectedDate } = useDateStore()
    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [shedule, setShedule] = useState<Array<IShedule>>([]);

    useEffect(() => {
        getShedule({ date: selectedDate.toISOString().slice(0, 10), group: group._id }).then(response => {
            if (response.schedule) {
                setShedule(response.schedule);
            }
            if (response.message) {
                setShedule([])
            }
        });
    }, [selectedDate]);

    // const onSubmit = (e: FormEvent) => {
    //     e.preventDefault();
    //     editShedule({ date: selectedDate.toISOString().slice(0, 10), group: group.name, items: items }).then(e => {
    //         if (!e.result && e.message) {
    //             setError(e.message);
    //             return;
    //         }
    //         setOpenPopUp(false);
    //         setTrigger(prev => !prev);
    //     });

    // };

    return (

        <div className={cls.tableContainer} ref={tableRef}>
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
            {shedule[0] ? shedule[0].items.map((item) => (
                <>
                    <div className={cls.btn}>

                    </div>

                    <div className={cls.tableBody}>

                        <div className={cls.item}>
                            <div className={cls.name}>{item.number ? item.number : 'Не найдено'}</div>
                        </div>
                        <div className={cls.item}>
                            <div className={cls.name}>{item.discipline ? item.discipline.name : 'Не найдено'}</div>
                        </div>
                        <div className={cls.item}>
                            <div className={cls.name}>
                                {item.teacher ? (
                                    ` ${item.teacher.surname} ${item.teacher.name || 'Не найдено'} ${item.teacher.patronymic || ''}`
                                ) : 'Не найдено'}
                            </div>
                        </div>
                        <div className={cls.item}>
                            <div className={cls.name}>{item.type ? item.type.name : 'Не найдено'}</div>
                        </div>
                        <div className={cls.item}>
                            <div className={cls.name}>Номер: {item.audithoria ? item.audithoria.name : 'Не найдено'} </div>
                        </div>


                    </div>
                    {/* {userRole === UserRoleEnum.admin && mode === ModeEnum.spectate && (
                        <Button darkBtn onClick={() => setOpenPopUp(true)}>Редактировать</Button>
                    )} */}
                    {/* {isOpenPopUp && (
                <PopUp title='Редактирование факультета' setOpenPopUp={setOpenPopUp} >
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            label="Текущее название"
                            value={item.discipline.name}
                            placeholder={item.discipline.name}
                            onChange={(value) => setShedule(prev => ({ ...prev, currentName: item.discipline.name }))}
                        />
                  

                        <Button lightBtn type='submit'>Сохранить</Button>
                    </Form>
                </PopUp>
            )} */}
                </>
            )) : (
                <div>Расписание не создано</div>
            )}
        </div>
    );
};

export { SpectateShedule }
