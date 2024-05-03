import { FC, useState } from 'react';

import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { ICourses } from '@/data/api';
import { Groups } from '../Groups';

import cls from './index.module.scss';

interface CoursesProps {
    courses: ICourses;
    searchValue: string,
}

const Courses: FC<CoursesProps> = ({ courses, searchValue }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

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

    const courseItem = (
        <>
            <div className={cls.coursesBlock}>
                <span className={cls.name}>{highlightMatch(courses.name, searchValue)}</span>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div >

            {(isOpen || searchValue) && courses.groups.filter((e) => JSON.stringify(e.name).toLowerCase().indexOf(searchValue.toLowerCase()) > -1).map((group) => (
                <Groups group={group} key={group._id} searchValue={searchValue}/>
            ))}
        </>
    );
    return courseItem
};

export { Courses }