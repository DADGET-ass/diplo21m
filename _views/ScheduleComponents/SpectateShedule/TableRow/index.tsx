import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";

import { ScheduleItemProps } from "..";

import cls from '../index.module.scss';
import { IDisciplines } from "@/data/api/disciplines/getDisciplines";
import { ITeachers, getTeachersByDiscipline } from "@/data/api";
import { ITypes } from "@/data/api/disciplines/types/getTypes";
import { IAudith } from "@/data/api/audithories/getAudithories";
import { useDateStore } from "@/data/store/useDateStore";

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
    activeFormDatas: ScheduleItemProps,
    setActiveFormDatas: Dispatch<SetStateAction<ScheduleItemProps[]>>,
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
    const [currentTeachers, setCurrentTeachers] = useState<ITeachers[]>([]);
    const { selectedDate } = useDateStore();

    useEffect(() => {
        if (item.discipline) {
            const selectedDiscipline = disciplines.find(d => d.name === item.discipline);
            if (selectedDiscipline) {
                getTeachersByDiscipline({ id: selectedDiscipline.id, date: selectedDate.toISOString().slice(0, 10) })
                    .then(response => {
                        setCurrentTeachers(response.teachers);
                    })
                    .catch(err => console.error(err));
            }
        }
    }, [item.discipline, disciplines, selectedDate]);

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
                        list={teachers.map(e => `${e.surname} ${e.name || ''} ${e.patronymic || ''}`)}
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
                        list={audithories.map(e => e.name)}
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
    );
};

export { TableRow };
