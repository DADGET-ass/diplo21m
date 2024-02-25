import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { FC, useState } from 'react';
import { ICourse } from '../index';
import { GroupItem } from '../GroupItem';

interface CourseItemProps {
    course: ICourse;
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

            {isOpen && course.groups.map((group) => (
                <GroupItem group={group} key={group._id} />
            ))}
        </>
    );
    return courseItem
};

export { CourseItem }