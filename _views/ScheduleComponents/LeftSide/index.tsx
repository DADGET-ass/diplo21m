import Link from 'next/link';
import { FacultsPart } from './FacultPart';
import { Partition } from './Partition';
import cls from './index.module.scss';
import { useRouter } from 'next/router';
import { TeachersPart } from './TeachersPart';



const LeftSide = () => {
    const { push } = useRouter
        ()

    return (
        <div className={cls.leftSide}>
            <Link href="/fullShedule">
                <div className={cls.full}>Полное расписание</div>
            </Link>
            <div className={cls.name}>Расписание</div>
            <div className={cls.menu}>
                <Link href={'facultets'} />
                <Partition title='Факультеты'>
                    <FacultsPart />
                </Partition>

                <Link href={'teachers'} />
                    <Partition title='Преподаватели'>
                        <TeachersPart />
                    </Partition>

                <Link href={'disciplines'} />
                    <Partition title='Дисциплины'>
                        <></>
                    </Partition>


            </div>
        </div>
    )
}

export { LeftSide };