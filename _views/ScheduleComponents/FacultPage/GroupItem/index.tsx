import { FC, useState } from 'react';

import { Button } from '@/_views/ui/Button';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';
import { IGroupsFacult } from '@/data/api/facultets/getFacultets';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';

import cls from './index.module.scss';

interface GroupItemProps {
    group: IGroupsFacult;
}

const GroupItem: FC<GroupItemProps> = ({ group }) => {

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()


    const groupItem = (
        <>
            <div className={cls.groupsBlock}>
                <div className={cls.name}>
                {group.name}
                </div>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <Button darkBtn onClick={() => setOpenPopUp(true)}>Редактировать</Button>
                )}
                
            </div>
            {isOpenPopUp && (
                <PopUp title='Редактирование группы' setOpenPopUp={setOpenPopUp}>
                    <Input type="text" disabled label="Текущее название группы" placeholder={group.name} />
                    <Input type="text" autoFocus label="Новое название группы" placeholder={''} />
                    {/* <Input type="text" disabled label="Текущие дисциплины" placeholder={''} />
                    <Input type="text" label="Новые дисциплины" placeholder={''} /> */}
                    <Button lightBtn>Сохранить</Button>
                </PopUp>
            )}
        </>
    );

    return groupItem
};

export { GroupItem };