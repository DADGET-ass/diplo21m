import { FacultsPart } from './FacultPart';
import { Partition } from './Partition';
import cls from './index.module.scss';



const LeftSide = () => {
    return(
        <div className={cls.leftSide}>
            <div className={cls.name}>Расписание</div>
            <div className={cls.menu}>
                <Partition title='Факультеты'>
                    <FacultsPart />
                </Partition>
                <Partition title='Преподаватели'>d</Partition>
                <Partition title='Факультеты'>s</Partition>
                
            </div>
        </div>
    )
}

export {LeftSide};