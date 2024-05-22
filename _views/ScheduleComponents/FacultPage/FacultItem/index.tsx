import { Dispatch, FC, SetStateAction, useState } from 'react';

import { Button } from '@/_views/ui/Button';
import { ArrowIcon, CloseIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { CourseItem } from '../CourseItem';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';
import { Form } from '@/_views/ui/Form';
import { IFacultets } from '@/data/api';

import cls from './index.module.scss';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';
import { deleteFacultet } from '@/data/api/facultets/deleteFacultet';

interface FacultItem {
    facultet: IFacultets;
    setTrigger: Dispatch<SetStateAction<boolean>>
}

const InnerFacultItem: FC<FacultItem> = ({ facultet, setTrigger }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);

    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()

    const [formData, setFormData] = useState({
        currentName: facultet.name,
        newName: "",
        newGroups: "",
        newAuditories: "",
    });


    const facultetDelete = () => {
        deleteFacultet({ id: facultet._id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

    const facultItem = (
        <>
            <div className={cls.facultsBlock} key={facultet._id} >
                <div className={cls.facultContent}>
                    <div className={cls.name}>
                        {facultet.name}
                    </div>
                    {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                        <Button lightBtn onClick={() => setOpenPopUp(true)}>Редактировать</Button>
                    )}


                </div>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <div className={cls.close} onClick={facultetDelete}>
                        <CloseIcon />
                    </div>
                )}
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>


            </div>
            {isOpen && facultet.courses?.map((course) => (
                <CourseItem course={course} key={course._id} />

            ))}
            {isOpenPopUp && (
                <PopUp title='Редактирование факультета' setOpenPopUp={setOpenPopUp} >
                    <Form>
                        <Input type="text" disabled label="Текущее название" placeholder={facultet.name} />
                        <Input type="text" autoFocus label="Новое название" placeholder={''} />
                        <Input type="text" disabled label="Текущие группы" placeholder={''} />
                        <Input type="text" label="Новые группы" placeholder={''} />
                        <Input type="text" disabled label="Текущие аудитории" autoFocus placeholder={''} />
                        <Input type="text" label="Новые аудитории" placeholder={''} />
                        <Button lightBtn type='submit'>Сохранить</Button>
                    </Form>
                </PopUp>
            )}
        </>

    );

    return facultItem
}

export { InnerFacultItem }