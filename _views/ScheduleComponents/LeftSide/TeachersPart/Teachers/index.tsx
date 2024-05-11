
import { FC, useState } from 'react';
import Link from 'next/link';

import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { IAllTeachers } from '@/data/api';

import cls from './index.module.scss';
import { useRouter } from 'next/router';


interface Teachers {
    teachers: IAllTeachers;
    searchValue: string
}

const TeacherItem: FC<Teachers> = ({ teachers, searchValue }) => {

    const { push } = useRouter();

    const formatInitials = (name: string, patronymic: string): string => {
        const firstNameInitial = name ? `${name.charAt(0)}.` : '';
        const patronymicInitial = patronymic ? `${patronymic.charAt(0)}.` : '';
        return `${firstNameInitial} ${patronymicInitial}`;
    };

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


    const teacherItem = (
        <div className={cls.teachersBlock} key={teachers.id} >
                <Link
                    className={cls.name}
                    href={`/teachers/${teachers.id}`}
                >
            <div className={cls.teachersContent}>
                    {highlightMatch(`${teachers.surname} ${formatInitials(teachers.name, teachers.patronymic)}`, searchValue)}

            </div>
                </Link>


        </div >

    );
    return teacherItem;
}
export { TeacherItem };



