import { FC, useState, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";

import { ScheduleItemProps } from "..";
import { ILection } from "@/data/types/interfaces";

import cls from '../index.module.scss';
import { IDisciplines } from "@/data/api/disciplines/getDisciplines";
import { ITeachers } from "@/data/api";

const DropdownInput = dynamic(
    () =>
        import("@/_views/ui/DropInput").then(
            (e) => e.DropdownInput
        ),
    { ssr: false }
);

interface TableRowProps {
    item: ScheduleItemProps;
    teachers?: ITeachers[];
    index: number;
    disciplines: IDisciplines[];
    lections: ILection[];
    activeFormDatas: {
        activeDiscipline: string,
        activeTeacher: string,
    },
    setActiveFormDatas: Dispatch<SetStateAction<{
        activeDiscipline: string,
        activeTeacher: string,
    }>>
}
const TableRow: FC<TableRowProps> = ({ item,
    teachers,
    index,
    lections,
    disciplines,
    activeFormDatas,
    setActiveFormDatas
}) => {
    return (
        <div className={cls.row} key={item.id}>
            <div className={cls.item}>{index + 1}</div>
            <div className={cls.item}>
                {disciplines && (
                    <DropdownInput
                        list={disciplines.map(e => e.name)}
                        value={activeFormDatas.activeDiscipline}
                        setActiveValue={newValue => setActiveFormDatas(prevState => ({ ...prevState, activeDiscipline: newValue }))}
                    />
                )}
            </div>
            <div className={cls.item}>
                {teachers && (
                    <DropdownInput
                        list={teachers.map(e => `${e.surname} ${e.name || ''} ${e.patronymic || ''}`)}
                        value={activeFormDatas.activeTeacher}
                        setActiveValue={newValue => setActiveFormDatas(prevState => ({ ...prevState, activeTeacher: newValue }))}
                    />
                )}
            </div>
            {/* <div className={cls.item}>
                <DropdownInput
                    options={lections.map((e) => ({ item: e.lection, id: e.id }))}
                    active={lections.filter(e => e.id === activeLectionId)[0].lection}
                    setSelectedOption={setActiveLectionId}
                />
            </div> */}
            <div className={cls.item}>{item.room}</div>
        </div>
    )
}

export { TableRow }