import Link from 'next/link';
import { FacultsPart } from './FacultPart';
import { Partition } from './Partition';
import cls from './index.module.scss';
import { useRouter } from 'next/router';
import { TeachersPart } from './TeachersPart';

export enum LeftMenuEnum {
    facult = 'facultets',
    teachers = 'teachers',
    disciplines = 'disciplines'
}

const LeftSide = () => {
    const { push } = useRouter


        ()

    return (
        <div className={cls.leftSide}>


            <div className={cls.full} onClick={() => push(`/fullShedule`)}>Полное расписание</div>

            <div className={cls.name}>Расписание</div>
            <div className={cls.menu}>
                <Partition title='Факультеты' type={LeftMenuEnum.facult}>
                    <FacultsPart />
                </Partition>

                <Partition title='Преподаватели' type={LeftMenuEnum.teachers}>
                    <TeachersPart />
                </Partition>

                <Partition title='Дисциплины' type={LeftMenuEnum.disciplines}>
                    <></>
                </Partition>


            </div>
        </div>
    )
}

export { LeftSide };