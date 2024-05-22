import { Title } from "@/_views/ui/Title/Index";
import cls from "./index.module.scss";
import { Button } from "@/_views/ui/Button";
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import { PopUp } from "@/_views/ui/PopUp";
import { Form } from "@/_views/ui/Form";
import { Input } from "@/_views/ui/Input";
import { TextArea } from "@/_views/ui/textArea";
import { Arcticle } from "@/_views/ui/Arcticle";
import { UserRoleEnum, useAuthStore } from "@/data/store/useAuthStore";
import { ModeEnum, useTabsStore } from "@/data/store/useTabsStore";
import { DropdownInput } from "@/_views/ui/DropInput";
import { IAllTeachers, addDisciplines, getFacultets, getTeachers } from "@/data/api";
import { IDiscipline } from "@/data/api/disciplines/addDisciplines";
import { IGroupsFacult } from "@/data/api/facultets/getFacultets";
import { Checkbox } from "@/_views/ui/Checkbox";

interface DisciplineHeaderProps {
    isOpenPopUp: boolean;
    setOpenPopUp: Dispatch<SetStateAction<boolean>>
}

const DisciplinesHeader:FC<DisciplineHeaderProps> = ({isOpenPopUp, setOpenPopUp}) => {

    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [teachers, setTeachers] = useState<IAllTeachers[]>([]);
    const [groups, setGroups] = useState<IGroupsFacult[]>([]);
    const [groupsArray, setGroupsArray] = useState<Array<string>>([]);
    const [teachersArray, setTeachersArray] = useState<Array<string>>([]);
    const [pc, setPc] = useState<boolean>(false);

    const { userRole } = useAuthStore();
    const { mode } = useTabsStore();

    useEffect(() => {
        getTeachers({ id: '' }).then(e => {
            setTeachers(e.teachers);
        });
        getFacultets().then(e => {
            const allGroups = e.facultets.flatMap(facultet => {
                return facultet.courses.flatMap(course => course.groups);
            });
            setGroups(allGroups);
        });
    }, []);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        addDisciplines({ name, groups: groupsArray.map((e) => ({ groupName: e, aH: 0 })), teachers: teachersArray, pc }).then(e => {
            if (!e.message && e.error) {
                setError(e.error);
                return
            }
            setOpenPopUp(false);
        })
    };

    const disciplinesHeader = (
        <>
            <div className={cls.title}>
                <Title>Дисциплины</Title>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <Button darkBtn onClick={() => setOpenPopUp(true)}>Создать</Button>
                )}
            </div>
            {isOpenPopUp && (
                <PopUp title='Создание дисциплины' setOpenPopUp={setOpenPopUp}>
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            label="Название"
                            placeholder=""
                            value={name}
                            onChange={(value) => setName(value)}
                        />

                        {teachers.length > 0 && (
                            <DropdownInput
                                label="Преподаватели"
                                list={teachers.map(e => `${e.surname} ${e.name} ${e.patronymic}`)}
                                setArray={setTeachersArray}
                            />
                        )}

                        {groups.length > 0 && (
                            <DropdownInput
                                label="Группы"
                                list={groups.map(e => e.name)}
                                setArray={setGroupsArray}
                            />
                        )}

                        <Checkbox value='pc' checked={pc} onChange={() => setPc(prev => !prev)} name="pc">
                            Компьютерная аудитория
                        </Checkbox>

                        <Button lightBtn type='submit'>
                            Создать
                            </Button>
                        {error && <span>{error}</span>}
                    </Form>
                </PopUp>
            )}
        </>
    );

    return disciplinesHeader;
};

export { DisciplinesHeader };
