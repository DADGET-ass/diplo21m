import { ArrowIcon, CloseIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import {
    Dispatch,
    FC,
    SetStateAction,
    useState
} from 'react';
import { Arcticle } from '@/_views/ui/Arcticle';
import { IDisciplines } from '@/data/api/disciplines/getDisciplines';
import { deleteDisciplines } from '@/data/api/disciplines/deleteDisciplines';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';

interface DisciplinesProps {
    disciplins: IDisciplines;
    setTrigger: Dispatch<SetStateAction<boolean>>
}

const Disciplines: FC<DisciplinesProps> = ({ disciplins, setTrigger }) => {

    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()

    const [isOpen, setOpen] = useState<boolean>(false);

    const disciplineDelete = () => {
        deleteDisciplines({ id: disciplins.id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

    return (
        <Arcticle>
            <div className={cls.disciplinesBlock}>
                <div className={cls.disciplines}>
                    <div className={cls.name}>
                        {disciplins.name}
                    </div>

                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <div className={cls.close} onClick={disciplineDelete}>
                        <CloseIcon />
                    </div>
                )}

            </div>
            {isOpen && (
                <div className={cls.groups}>
                    {disciplins.groups.map(group => (
                        <div key={group._id} className={cls.groupName}>
                            {group.item.name}
                        </div>
                    ))}
                </div>
            )}
        </Arcticle>
    );
};

export { Disciplines };
