import { ArrowIcon } from "@/_views/ui/svg_dynamic/base.svg";
import { ICourses } from "@/data/api";
import { FC, useState } from "react";

import cls from './index.module.scss';
import { Group } from "../Group";

interface CoursesProps {
    course: ICourses;
}

const Courses: FC<CoursesProps> = ({ course }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>

            <div className={cls.group}>
                <div className={cls.facultsBlock}>
                    <div className={cls.name}>
                    <span>Курс </span> {course.name}
                    </div>
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div>
            {isOpen && course.groups.map((group) => (
                <Group group={group} key={group._id}/>
            ))}
        </>
    )
}

export { Courses }