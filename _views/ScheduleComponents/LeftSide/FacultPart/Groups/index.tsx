import { FC, useState } from 'react';
import cls from './index.module.scss';
import { IGroups } from '@/data/api';
import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';

interface GroupsProps {
    group: IGroups;
    searchValue: string,
}

const Groups: FC<GroupsProps> = ({ group, searchValue }) => {


    const highlightMatch = (text: string, searchQuery: string) => {
        const lowerText = text?.toLowerCase();
        const lowerSearchQuery = searchQuery.toLowerCase();

        if (!searchQuery || !lowerText?.includes(lowerSearchQuery)) {
            return <span>{text}</span>;
        }

        const startIdx = lowerText.indexOf(lowerSearchQuery);
        const endIdx = startIdx + searchQuery.length;

        return (
            <span>
                {text.substring(0, startIdx)}
                <span className={cls.highlight}>{text.substring(startIdx, endIdx)}</span>
                {text.substring(endIdx)}
            </span>
        );
    };

    const groupItem = (
        <>
            <div className={cls.groupsBlock}>
                <span className={cls.name}>{highlightMatch(group.name, searchValue)}</span>
            </div>
        </>
    );

    return groupItem
};

export { Groups };