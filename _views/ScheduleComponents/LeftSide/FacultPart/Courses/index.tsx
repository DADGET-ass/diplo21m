import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { FC, useState } from 'react';
import { ICourses } from '../index';
import { Groups } from '../Groups';


interface CoursesProps {
    courses: ICourses;
}

const Courses: FC<CoursesProps> = ({ courses }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const courseItem = (
        <>
            <div className={cls.coursesBlock}>
                <div className={cls.name}>
                    {courses.name}
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                <ArrowIcon />
            </div>
            </div >

            {isOpen && courses.groups.map((group) => (
                <Groups group={group} key={group._id} />
            ))}
        </>
    );
    return courseItem
};

export { Courses }