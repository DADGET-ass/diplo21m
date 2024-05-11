import { FC, useState, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";

import { ScheduleItemProps } from "..";

import cls from '../index.module.scss';
import { IDisciplines } from "@/data/api/disciplines/getDisciplines";
import { ITeachers } from "@/data/api";
import { ITypes } from "@/data/api/disciplines/types/getTypes";
import { IAudith } from "@/data/api/audithories/getAudithories";

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
    audithories: IAudith[];
    types: ITypes[];
    activeFormDatas: {
        activeDiscipline: string,
        activeTeacher: string,
        activeTypes: string,
        activeAudithories: string,
    },
    setActiveFormDatas: Dispatch<SetStateAction<{
        activeDiscipline: string,
        activeTeacher: string,
        activeTypes: string,
        activeAudithories: string,
    }>>
}
const TableRow: FC<TableRowProps> = ({ item,
    teachers,
    index,
    types,
    disciplines,
    audithories,
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
            <div className={cls.item}>
                {types && (
                    <DropdownInput
                        list={types.map(e => e.name)}
                        value={activeFormDatas.activeTypes}
                        setActiveValue={newValue => setActiveFormDatas(prevState => ({ ...prevState, activeTypes: newValue }))}
                        
                    />
                    
                )}
                
            </div>
            <div className={cls.item}>
            {audithories && (
                    <DropdownInput
                        list={audithories.map(e => e.name)}
                        value={activeFormDatas.activeAudithories}
                        setActiveValue={newValue => setActiveFormDatas(prevState => ({ ...prevState, activeAudithories: newValue }))}
                        
                    />
                    
                )}</div>
        </div>
    )
}

export { TableRow }