import { IAllTeachers, ITeachers } from "@/data/api";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";

import cls from './index.module.scss';
import { CloseIcon } from "@/_views/ui/svg_dynamic/base.svg";
import { deleteTeacher } from "@/data/api/teachers/deleteTeacher";
import { UserRoleEnum, useAuthStore } from "@/data/store/useAuthStore";
import { ModeEnum, useTabsStore } from "@/data/store/useTabsStore";
import { Button } from "@/_views/ui/Button";
import { PopUp } from "@/_views/ui/PopUp";
import { Form } from "@/_views/ui/Form";
import { Input } from "@/_views/ui/Input";
import { editTeacher } from "@/data/api/teachers/editTeachers";

interface DisciplineProps {
    name: string
}

const Discipline: FC<DisciplineProps> = ({ name }) => {

    return (
        <div>{name}</div>
    )
}

interface TeacherProps {
    teacher: IAllTeachers,
    setTrigger: Dispatch<SetStateAction<boolean>>
}

const Teacher: FC<TeacherProps> = ({ teacher, setTrigger }) => {
    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false)
    const [error, setError] = useState<string>('');

    const [formData, setFormData] = useState<{
        id: string,
        surname: string,
        name: string,
        patronymic: string,
        aH: number,
    }>({
        id: teacher.id,
        surname: teacher.surname,
        name: teacher.name,
        patronymic: teacher.patronymic,
        aH: teacher.aH,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        editTeacher({
            id: teacher.id,
            surname: formData.surname,
            name: formData.name,
            patronymic: formData.patronymic,
            aH: formData.aH
        }).then(e => {
            if (e.error) {
                setError(e.error);
                return
            }
            setOpenPopUp(false);
            setTrigger(prev => !prev);
        });
    }

    const teacherDelete = () => {
        deleteTeacher({ id: teacher.id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

    return (
        <>
            <div className={cls.teachersBlock}>
                <div style={{ textTransform: 'uppercase' }} className={cls.ident}>Личный идентификатор: №{teacher.id.slice(0, 8)}</div>
                <div className={cls.teacher}>ФИО: {teacher.surname} {teacher.name} {teacher.patronymic}</div>
                {teacher.disciplines && (
                    <div className={cls.row}>
                        <p>Дисциплины: </p>
                        {teacher.disciplines.map((e, index) => (
                            <Discipline key={e._id} name={e.name} />
                        ))}
                    </div>
                )}
                <div>Всего часов: {teacher.aH}</div>
                <div>Отработано: {teacher.burden?.filter((e) => `${new Date(e.mounth).getFullYear()}_${new Date(e.mounth).getMonth()}` === `${new Date().getFullYear()}_${new Date().getMonth()}`)
                    .map((e) => e.hH)[0] || '0'}
                    /{teacher.aH}
                </div>

                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <div className={cls.btnBlock}>
                        <Button darkBtn onClick={() => setOpenPopUp(true)}>Редактировать</Button>
                        <div className={cls.close} onClick={teacherDelete}>
                            <CloseIcon />
                        </div>
                    </div>

                )}
            </div>
            {isOpenPopUp && (
                <PopUp title='Редактирование преподавателя' setOpenPopUp={setOpenPopUp} >
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                        
                            label="Фамилия"
                            placeholder={'Введите фамилию'}
                            value={formData.surname}
                            onChange={(e) => setFormData(prev => ({ ...prev, surname: e }))}
                        />
                        <Input
                            type="text"

                            label="Имя"
                            placeholder={'Введите имя'}
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e }))}
                        />
                        <Input
                            type="text"

                            label="Отчество"
                            placeholder={'Введите отчество'}
                            value={formData.patronymic}
                            onChange={(e) => setFormData(prev => ({ ...prev, patronymic: e }))}
                        />
                        <Input
                            type="number"

                            label="Общая нагрузка"
                            placeholder={'Введите общую нагрузку'}
                            value={String(formData.aH)}
                            onChange={(e) => setFormData(prev => ({ ...prev, aH: parseInt(e) || 0 }))}
                        />

                        <Button lightBtn type='submit'>Сохранить</Button>
                    </Form>
                </PopUp>
            )}
        </>
    )
}

export { Teacher }