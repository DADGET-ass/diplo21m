import { FC, useState } from 'react';

import { Button } from '@/_views/ui/Button';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';
import { IGroups } from '@/data/api';

import cls from './index.module.scss';

interface GroupItemProps {
    group: IGroups;
}

const GroupItem: FC<GroupItemProps> = ({ group }) => {

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);

    const groupItem = (
        <>
            <div className={cls.groupsBlock}>
                <div className={cls.name}>
                    {group.name}
                </div>
                <Button darkBtn onClick={() => setOpenPopUp(true)}>Редактировать</Button>
            </div>
            {isOpenPopUp && (
                <PopUp title='Редактирование группы' setOpenPopUp={setOpenPopUp}>
                    <Input type="text" disabled label="Текущее название группы" placeholder={''} />
                    <Input type="text" autoFocus label="Новое название группы" placeholder={''} />
                    <Input type="text" disabled label="Текущие дисциплины" placeholder={''} />
                    <Input type="text" label="Новые дисциплины" placeholder={''} />
                    <Button lightBtn>Сохранить</Button>
                </PopUp>
            )}
        </>
    );

    return groupItem
};

export { GroupItem };