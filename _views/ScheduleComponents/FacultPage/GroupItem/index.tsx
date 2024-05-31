import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react';

import { Button } from '@/_views/ui/Button';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';
import { IGroupsFacult } from '@/data/api/facultets/getFacultets';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';
import { Form } from '@/_views/ui/Form';

import cls from './index.module.scss';
import { editGroup } from '@/data/api/facultets/editGroup';
import { CloseIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { deleteGroup } from '@/data/api/facultets/deleteGroup';

interface GroupItemProps {
    group: IGroupsFacult;
    setTrigger: Dispatch<SetStateAction<boolean>>
}

const GroupItem: FC<GroupItemProps> = ({ group, setTrigger }) => {

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()
    const [groupName, setGroupName] = useState<string>(group.name)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        editGroup({ id: group._id, name: groupName }).then(e => {
            if (!e.error) {
                setOpenPopUp(false)
            }
            setTrigger(prev => !prev)
            return
        })
    }

    const groupDelete = () => {
        deleteGroup({ id: group._id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

    const groupItem = (
        <>
            <div className={cls.groupsBlock}>
                <div className={cls.name}>
                    {group.name}
                </div>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <>
                        <Button darkBtn onClick={() => setOpenPopUp(true)}>Редактировать</Button>
                        <div className={cls.close} onClick={groupDelete}>
                            <CloseIcon />
                        </div>
                    </>
                )}

            </div>
            
            {isOpenPopUp && (
                <PopUp title='Редактирование группы' setOpenPopUp={setOpenPopUp}>
                    <Form onSubmit={onSubmit}>
                        <Input type="text" disabled label="Текущее название группы" placeholder={group.name} />
                        <Input
                            type="text"
                            autoFocus
                            label="Новое название группы"
                            value={groupName}
                            placeholder={''}
                            onChange={(e) => setGroupName(e)}
                        />
                        <Button lightBtn>Сохранить</Button>
                    </Form>
                </PopUp>
            )}
        </>
    );

    return groupItem
};

export { GroupItem };