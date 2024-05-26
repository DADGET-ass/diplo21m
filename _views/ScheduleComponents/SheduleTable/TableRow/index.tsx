import { FC, useState, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";


import cls from '../index.module.scss';
import { IDisciplines } from "@/data/api/disciplines/getDisciplines";
import { ITeachers } from "@/data/api";
import { ITypes } from "@/data/api/disciplines/types/getTypes";
import { IAudith } from "@/data/api/audithories/getAudithories";
import { IItems } from "@/data/api/fullShedule/addShedule";

const DropdownInput = dynamic(
    () =>
        import("@/_views/ui/DropInput").then(
            (e) => e.DropdownInput
        ),
    { ssr: false }
);

interface TableRowProps {
    item: IItems;
    teachers?: ITeachers[];
    index: number;
    disciplines: IDisciplines[];
    audithories: IAudith[];
    types: ITypes[];
    activeFormDatas: IItems,
    setActiveFormDatas: Dispatch<SetStateAction<IItems[]>>,
}
const TableRow: FC<TableRowProps> = ({
    item,
    teachers,
    index,
    types,
    disciplines,
    audithories,
    activeFormDatas,
    setActiveFormDatas
}) => {
    return (
        <div className={cls.row} key={item.number}>
            <div className={cls.item}>
                {index + 1}
            </div>
            <div className={cls.item}>
                {disciplines && (
                    <DropdownInput
                        list={disciplines.map(e => e.name)}
                        value={activeFormDatas.discipline}
                        setActiveValue={newValue => {
                            setActiveFormDatas(prevState => {
                                const updatedScheduleItems = [...prevState];
                                updatedScheduleItems[index] = { ...updatedScheduleItems[index], discipline: newValue };
                                return updatedScheduleItems;
                            })
                        }}
                    />
                )}
            </div>
            <div className={cls.item}>
                {teachers && (
                    <DropdownInput
                    // `${e.surname} ${e.name} ${e.patronymic}`
                        list={teachers.map(e => e.surname)}
                        value={activeFormDatas.teacher}
                        setActiveValue={newValue => setActiveFormDatas(prevState => {
                            const updatedScheduleItems = [...prevState];
                            updatedScheduleItems[index] = { ...updatedScheduleItems[index], teacher: newValue };
                            return updatedScheduleItems;
                        })}
                    />
                )}
            </div>
            <div className={cls.item}>
                {types && (
                    <DropdownInput
                        list={types.map(e => e.name)}
                        value={activeFormDatas.type}
                        setActiveValue={newValue => setActiveFormDatas(prevState => {
                            const updatedScheduleItems = [...prevState];
                            updatedScheduleItems[index] = { ...updatedScheduleItems[index], type: newValue };
                            return updatedScheduleItems;
                        })}
                    />

                )}

            </div>
            <div className={cls.item}>
                
                {audithories && (
                    
                    <DropdownInput
                    list={audithories.map(e => `${e.name} ${e.pc ? "(Компьютерная)" : ""}`)}
                        value={activeFormDatas.audithoria}
                        setActiveValue={newValue => setActiveFormDatas(prevState => {
                            const updatedScheduleItems = [...prevState];
                            updatedScheduleItems[index] = { ...updatedScheduleItems[index], audithoria: newValue };
                            return updatedScheduleItems;
                        })}
                    />

                )}
            </div>
        </div>
    )
}

export { TableRow }