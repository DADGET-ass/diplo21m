import Link from 'next/link';
import { FacultsPart } from './FacultPart';
import { Partition } from './Partition';
import cls from './index.module.scss';
import { useRouter } from 'next/router';



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
                <div onClick={() => push('facultets')}>
                    <Partition title='Факультеты'>
                        <FacultsPart />
                    </Partition>
                </div>
                <div onClick={() => push('teachers')}>
                    <Partition title='Преподаватели'>
                        <></>
                    </Partition>
                </div>
                <div onClick={() => push('disciplines')}>
                    <Partition title='Дисциплины'>
                        <></>
                    </Partition>
                </div>


            </div>
        </div>
    )
}

export { LeftSide };