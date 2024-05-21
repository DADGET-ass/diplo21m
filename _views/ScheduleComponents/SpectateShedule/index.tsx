import {
    useEffect,
    useState,
    FC,
    MutableRefObject
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
            {shedule[0] ? shedule[0].items.map((item) => (
                <>
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
                        <div className={cls.tableHead}>
                            <div className={cls.item}>
                                <div className={cls.name}>{item.number}</div>
                            </div>
                            <div className={cls.item}>
                                <div className={cls.name}>{item.discipline?.name}</div>
                            </div>
                            <div className={cls.item}>
                                <div className={cls.name}>{item.teacher.surname} {item.teacher.name || ''} {item.teacher.patronymic || ''}</div>
                            </div>
                            <div className={cls.item}>
                                <div className={cls.name}>{item.type.name}</div>
                            </div>
                            <div className={cls.item}>
                                <div className={cls.name}>{item.audithoria.name} </div>
                            </div>

                        </div>
                    </div>
                </>
            )) : (
                <div>Расписания пока нема</div>
            )}
        </div>
    );
};

export { SpectateShedule }
