import {
    FormEvent,
    useState,
    Dispatch,
    SetStateAction,
    FC
} from 'react';

import { Title } from '@/_views/ui/Title/Index';
import { Button } from '@/_views/ui/Button';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';
import { Form } from '@/_views/ui/Form';
import { addTeacher } from '@/data/api';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';

import cls from './index.module.scss';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';

interface IFormData {
    surname: string,
    name: string,
    patronymic: string,
    aH: string,
}

interface TeachersHeaderProps {
    setTrigger: Dispatch<SetStateAction<boolean>>,
}

const TeachersHeader: FC<TeachersHeaderProps> = ({ setTrigger }) => {
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<IFormData>({
        surname: '',
        name: '',
        patronymic: '',
        aH: '',
    })
    const [serverError, setServerError] = useState<string>()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        addTeacher({
            surname: formData.surname,
            name: formData.name,
            patronymic: formData.patronymic,
            aH: Number(formData.aH)
        }).then(e => {
            if (e.error) {
                setServerError(e.error);
                return
            }
            setOpenPopUp(false);
            setTrigger(prev => !prev);
        })
    }

    console.warn(mode)

    return (
        <>
            <div className={cls.title}>
                <Title>Преподаватели</Title>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit &&(
                    <Button darkBtn onClick={() => setOpenPopUp(true)}>Создать</Button>
                )}
            </div>

            {isOpenPopUp && (
                <PopUp title='Добавление преподавателя' setOpenPopUp={setOpenPopUp}>
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            label="Фамилия"
                            placeholder={''}
                            value={formData.surname}
                            onChange={(value) => setFormData((prev) => ({ ...prev, surname: value }))}
                            required
                        />

                        <Input
                            type="text"
                            label="Имя"
                            placeholder={''}
                            value={formData.name}
                            onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
                            required
                        />

                        <Input
                            type="text"
                            label="Отчество"
                            placeholder={''}
                            value={formData.patronymic}
                            onChange={(value) => setFormData((prev) => ({ ...prev, patronymic: value }))}
                            required
                        />

                        <Input
                            type="number"
                            label="Нагрузка"
                            placeholder={''}
                            value={formData.aH}
                            onChange={(value) => setFormData((prev) => ({ ...prev, aH: value }))}
                            required
                        />
                        <div className={cls.error}>{serverError}</div>
                        <Button lightBtn type='submit'>
                            Добавить
                        </Button>
                        {error && <span>{error}</span>}
                    </Form>
                </PopUp>
            )}
        </>
    );
};


export { TeachersHeader }