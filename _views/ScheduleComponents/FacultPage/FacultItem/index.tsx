import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react';

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
import { editFacults } from '@/data/api/facultets/editFacultet';
import { TextArea } from '@/_views/ui/textArea';
import { DropdownInput } from '@/_views/ui/DropInput';
import { Arcticle } from '@/_views/ui/Arcticle';

interface FacultItem {
    facultet: IFacultets;
    setTrigger: Dispatch<SetStateAction<boolean>>

}

const InnerFacultItem: FC<FacultItem> = ({ facultet, setTrigger }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [groups, setGroups] = useState<string>('');
    const [groupsArray, setGroupsArray] = useState<Array<string>>([]);
    const [name, setName] = useState<string>('')


    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()

    const [formData, setFormData] = useState({
        currentName: facultet.name,
        newName: "",
        newGroups: "",
        newAuditories: "",
    });




    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        editFacults({ id: facultet._id, name: formData.currentName, groups: groupsArray }).then(e => {
            if (!e.result && e.message) {
                setError(e.message);
                return;
            }
            setOpenPopUp(false);
            setTrigger(prev => !prev);
        });
    };

    const facultetDelete = () => {
        deleteFacultet({ id: facultet._id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

    const facultItem = (
        <Arcticle>

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
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            disabled
                            label="Текущее название"
                            placeholder={facultet.name}
                        />
                        <Input
                            type="text"
                            autoFocus
                            label="Новое название"
                            placeholder={''}
                            value={facultet.name}
                            onChange={(value) => setFormData(prev => ({ ...prev, currentName: value }))}
                        />
                        <Input
                            type="text"
                            disabled
                            label="Текущие группы"
                            placeholder={facultet.courses
                                .flatMap(course => course.groups)
                                .map(group => group.name)
                                .join(', ')}
                        />
                        <TextArea
                            type="text"
                            label="Группа"
                            pre={name}
                            value={groups}
                            preWords={facultet.courses.flatMap(course => course.groups.map(group => group.name))}
                            onChange={(value) => setGroups(value)}
                            setGroupsArray={setGroupsArray}
                        />

                        <Button lightBtn type='submit'>Сохранить</Button>
                    </Form>
                </PopUp>
            )}
        </Arcticle>

    );

    return facultItem
}

export { InnerFacultItem }
