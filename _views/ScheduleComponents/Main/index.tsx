import { IDiscipline, getDisciplines } from "@/data/api/getDisciplines";
import { useEffect, useState } from "react";
import { FacultsPage } from "../FacultPage/FacultsHeader";
import { LeftSide } from "../LeftSide";
import cls from './index.module.scss'


const _Main = () => {

    const _main = (
        <div className={cls.main}>
            <LeftSide />
            <FacultsPage />
        </div>
    );

    return _main;
}

export { _Main }

