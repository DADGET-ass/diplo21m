
import { useEffect, useState } from "react";
import { FacultsPage } from "../FacultPage/FacultsHeader";
import { LeftSide } from "../LeftSide";
import cls from './index.module.scss'


const _Main = () => {

    const _main = (
        <div className={cls.main}>
                <div className={cls.textBlock}>
                    <div className={cls.text}>
                        Добро пожаловать в веб-приложение "Расписание АТК ДГТУ",<br />
                        надеемся что вам будет комфортно пользоваться нашим приложением,<br />
                        благодарим за внимание!
                    </div>
                    <div className={cls.authors}>
                        Над проектом старались: Кох Алексей и Ширабоков Иван
                    </div>
                </div>

        </div>
    );

    return _main;
}

export { _Main }

