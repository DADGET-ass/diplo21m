import { FC, useState } from "react";
import dynamic from "next/dynamic";

import { ScheduleItemProps } from "..";
import { ILection, ITeacher } from "@/data/types/interfaces";

import cls from '../index.module.scss';

const DropdownInput = dynamic(
    () =>
        import("@/_views/ui/DropInput").then(
            (e) => e.DropdownInput
        ),
    { ssr: false }
);

interface TableRowProps {
    item: ScheduleItemProps;
    teachers?: ITeacher[];
    index: number;
    lections: ILection[];
}

const TableRow: FC<TableRowProps> = ({ item, teachers, index, lections }) => {
    const [activeTeacherId, setActiveTeacherId] = useState<string>('')
    const [activeLectionId, setActiveLectionId] = useState<string>('1');

    return (
        <div className={cls.row} key={item.id}>
            <div className={cls.item}>{index + 1}</div>
            <div className={cls.item}>

            </div>
            <div className={cls.item}>
                {teachers && (
                    <DropdownInput
                        options={teachers.map((e) => ({ item: e.teacher.surname, id: e.id }))}
                        active={teachers.filter(e => e.id === activeTeacherId)[0].teacher.surname}
                        setSelectedOption={setActiveTeacherId}
                    />
                )}
            </div>
            <div className={cls.item}>
                <DropdownInput
                    options={lections.map((e) => ({ item: e.lection, id: e.id }))}
                    active={lections.filter(e => e.id === activeLectionId)[0].lection}
                    setSelectedOption={setActiveLectionId}
                />
            </div>
            <div className={cls.item}>{item.room}</div>
        </div>
    )
}

export { TableRow }