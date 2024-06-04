import {
    useEffect,
    useState,
    FC,
    MutableRefObject,
    FormEvent
} from 'react';

import { IShedule, getShedule } from '@/data/api/fullShedule/getShedule';
import { useDateStore } from '@/data/store/useDateStore';
import { IGroupsFacult } from '@/data/api/facultets/getFacultets';

import cls from './index.module.scss';
import { useAuthStore } from '@/data/store/useAuthStore';
import {  useTabsStore } from '@/data/store/useTabsStore';


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
}

const SpectateShedule: FC<SpectateSheduleProps> = ({ group, tableRef }) => {
    const { selectedDate } = useDateStore()

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
                   
                </>
            )) : (
                <div>Расписание не создано</div>
            )}
        </div>
    );
};

export { SpectateShedule }
