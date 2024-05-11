import { FC, useState } from 'react';
import Link from 'next/link';

import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import { IFacultets } from '@/data/api';

import { Courses } from '../Courses';

import cls from './index.module.scss';
import { useRouter } from 'next/router';

interface Facultets {
    facultets: IFacultets;
    searchValue: string
}

const Facultets: FC<Facultets> = ({ facultets, searchValue }) => {
    const { push } = useRouter()
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

    const facultItem = (
        <>
            <div className={cls.facultsBlock} key={facultets._id} >
                <div className={cls.facultContent}>
                    <Link
                        className={cls.name}
                        href={`/facultets/${facultets._id}`}
                    >
                        {highlightMatch(facultets.name, searchValue)}
                    </Link>
                    <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                        <ArrowIcon />
                    </div>
                </div>

            </div>
            {(isOpen || searchValue) && facultets.courses.filter((e) => JSON.stringify([e.groups, e.name]).toLowerCase().indexOf(searchValue.toLowerCase()) > -1).map((course) => (
                <Courses courses={course} key={course._id} searchValue={searchValue} />
            ))
            }

        </>

    );

    return facultItem
}

export { Facultets }