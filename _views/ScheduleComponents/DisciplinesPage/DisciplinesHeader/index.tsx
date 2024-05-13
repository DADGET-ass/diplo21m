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
import { IAllTeachers, IGroups, addDisciplines, getFacultets, getTeachers } from "@/data/api";

const DisciplinesHeader = () => {

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [teacherName, setTeacherName] = useState<string>('');
    const [groupName, setGroupName] = useState<string>('');
    const [teachers, setTeachers] = useState<IAllTeachers[]>([]);
    const [groups, setGroups] = useState<IGroups[]>([]);
    const [groupsArray, setGroupsArray] = useState<Array<string>>([])
    const [teachersArray, setTeachersArray] = useState<Array<string>>([])

    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()


    useEffect(() => {
        const groupArr: Array<string> = []
        for (const _ of groupName.split(',')) {
            if (_ !== '') {
                groupArr.push(_)
            }
        }
        setGroupsArray(groupArr);
    }, [groupName])

    useEffect(() => {
        const teacherArr: Array<string> = []
        for (const _ of teacherName.split(',')) {
            if (_ !== '') {
                teacherArr.push(_)
            }
        }
        setTeachersArray(teacherArr);
    }, [teacherName])

    useEffect(() => {
        getTeachers({ id: '' }).then(e => {
            setTeachers(e.teachers);

        })
        getFacultets().then(e => {
            const allGroups = e.facultets.flatMap(facultet => {
                return facultet.courses.flatMap(course => course.groups);
            });
            setGroups(allGroups);
        });
    }, []);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        addDisciplines({ name, groups: groupsArray, teachers: teachersArray }).then(e => {
            if (e.message) {
                setError(e.message);
                return
            }
            setOpenPopUp(false);
        })
    }

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
                            placeholder={''}
                            value={name}
                            onChange={(value) => setName(value)} />

                        <p>Учителя</p>
                        {teachers && (
                            <DropdownInput
                                list={teachers.map(e => `${e.surname} ${e.name} ${e.patronymic}`)}
                                value={teacherName}
                                setActiveValue={newValue => setTeacherName(newValue)}
                            />
                        )}

                        <p>Группы</p>
                        {groups && (
                            <DropdownInput
                                list={groups.map(e => e.name)}
                                value={groupName}
                                setActiveValue={newValue => setGroupName(newValue)}
                            />
                        )}

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