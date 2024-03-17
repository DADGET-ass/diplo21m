import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { FC, useState } from 'react';
import { GroupItem } from '../GroupItem';
import { ICourses } from '@/data/api/getFacultets';

interface CourseItemProps {
    course: ICourses;
}

const CourseItem: FC<CourseItemProps> = ({ course }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const courseItem = (
        <>
            <div className={cls.coursesBlock}>
                <div className={cls.name}>
                    {course.name}
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div >

            {isOpen && course.groups?.map((_groups) => (
                <GroupItem group={_groups} key={_groups._id} />
            ))}
        </>
    );
    return courseItem
};

export { CourseItem }