import { ArrowIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { FC, useState } from 'react';
import { Arcticle } from '@/_views/ui/Arcticle';
import { IDisciplines } from '@/data/api/disciplines/getDisciplines';

interface DisciplinesProps {
    disciplins: IDisciplines;
}

const Disciplines: FC<DisciplinesProps> = ({ disciplins }) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <Arcticle>
            <div className={cls.disciplinesBlock}>
                <div className={cls.disciplines}>
                    <div className={cls.name}>
                        {disciplins.name}
                    </div>
                    {/* <div className={cls.delete}>
                        удалить
                    </div> */}
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div>
            {/* {isOpen && (
                <div className={cls.groups}>
                    {disciplins.groups.map(group => (
                        <div key={group._id} className={cls.groupName}>
                            {group.item.map(item => (
                                <div key={item._id}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )} */}
        </Arcticle>
    );
};

export { Disciplines };
