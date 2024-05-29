import { IFacultets } from "@/data/api";
import { FC, useState } from "react";

import cls from './index.module.scss'
import { ArrowIcon } from "@/_views/ui/svg_dynamic/base.svg";
import { Courses } from "../Courses";
interface FacultProps {
    facult: IFacultets,
}

const Facult: FC<FacultProps> = ({ facult }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className={cls.group}>
                <div className={cls.facultsBlock}>
                    <div className={cls.name}>
                        {facult.name}
                    </div>
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div>
            {isOpen && facult.courses.map((course) => (
                <Courses course={course} key={course._id + facult._id} />
            ))}
        </>
    )
}

export { Facult }