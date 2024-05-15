import { Title } from "@/_views/ui/Title/Index";
import cls from "./index.module.scss";
import { Button } from "@/_views/ui/Button";
import { FormEvent, useEffect, useState } from "react";
import { PopUp } from "@/_views/ui/PopUp";
import { Form } from "@/_views/ui/Form";
import { Input } from "@/_views/ui/Input";
import { TextArea } from "@/_views/ui/textArea";
import { Arcticle } from "@/_views/ui/Arcticle";
import { UserRoleEnum, useAuthStore } from "@/data/store/useAuthStore";
import { ModeEnum, useTabsStore } from "@/data/store/useTabsStore";
import { DropdownInput } from "@/_views/ui/DropInput";
import { IAllTeachers, addDisciplines, getFacultets, getTeachers } from "@/data/api";
import { IDiscipline, IGroups } from "@/data/api/disciplines/addDisciplines";
import { IGroupsFacult } from "@/data/api/facultets/getFacultets";

const DisciplinesHeader = () => {
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [teacherName, setTeacherName] = useState<string>('');
    const [groupName, setGroupName] = useState<string>('');
    const [teachers, setTeachers] = useState<IAllTeachers[]>([]);
    const [groups, setGroups] = useState<IGroupsFacult[]>([]);
    const [groupsArray, setGroupsArray] = useState<Array<IGroups>>([]);
    const [teachersArray, setTeachersArray] = useState<Array<string>>([]);
    const [pc, setPc] = useState<boolean>(false);

    const { userRole } = useAuthStore();
    const { mode } = useTabsStore();

  
    useEffect(() => {
        const groupArr: Array<IGroups> = groupName.split(',')
            .filter(_ => _ !== '')
            .map(group => ({
                groupName: group,
                aH: 0,
            }));
        setGroupsArray(groupArr);
    }, [groupName]);

    useEffect(() => {
        const teacherArr: Array<string> = teacherName.split(',')
            .filter(_ => _ !== '');
        setTeachersArray(teacherArr);
    }, [teacherName]);

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
        addDisciplines({ name, groups: groupsArray, teachers: teachersArray, pc }).then(response => {
            if (response.error) {
                setError(response.error);
            } else {
                setError('');
                setOpenPopUp(false);
            }
        }).catch(err => {
            setError('Произошла ошибка');
            console.error(err);
        });
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
                            autoFocus
                            label="Название"
                            placeholder=""
                            value={name}
                            onChange={(value) => setName(value as string)}
                        />
                        <p>Учителя</p>
                        {teachers.length > 0 && (
                            <DropdownInput
                                list={teachers.map(e => `${e.surname} ${e.name} ${e.patronymic}`)}
                                value={teacherName}
                                setActiveValue={newValue => setTeacherName(newValue)}
                            />
                        )}
                        <p>Группы</p>
                        {groups.length > 0 && (
                            <DropdownInput
                                list={groups.map(e => e.name)}
                                value={groupName}
                                setActiveValue={newValue => setGroupName(newValue)}
                            />
                        )}
                        <p>Компьютерный класс</p>
                        <Input
                            type="checkbox"
                            checked={pc}
                            onChange={(checked) => setPc(checked as boolean)}
                        />

                        <Button lightBtn type='submit'>Создать</Button>
                        {error && <span>{error}</span>}
                    </Form>
                </PopUp>
            )}
        </>
    );

    return disciplinesHeader;
};

export { DisciplinesHeader };
