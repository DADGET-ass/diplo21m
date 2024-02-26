import { FC, useState } from 'react';
import cls from './index.module.scss';
import { IGroups } from '../index';
import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';

interface GroupsProps {
    group: IGroups;
}

const Groups: FC<GroupsProps> = ({ group }) => {

    const groupItem = (
        <>
            <div className={cls.groupsBlock}>
                <div className={cls.name}>
                    {group.name}
                </div>
            </div>
        </>
    );

    return groupItem
};

export { Groups };