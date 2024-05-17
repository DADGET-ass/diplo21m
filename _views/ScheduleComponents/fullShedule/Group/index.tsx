import { ArrowIcon } from "@/_views/ui/svg_dynamic/base.svg";
import { IGroupsFacult } from "@/data/api/facultets/getFacultets";
import { UserRoleEnum, useAuthStore } from "@/data/store/useAuthStore";
import { ModeEnum, useTabsStore } from "@/data/store/useTabsStore";
import { FC, useState } from "react";
import { SheduleTable } from "../../SheduleTable";


import cls from './index.module.scss';
import { SpectateShedule } from "../../SpectateShedule";

interface GroupsProps {
    group: IGroupsFacult,
}

const Group: FC<GroupsProps> = ({ group }) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { mode } = useTabsStore();
    const { userRole } = useAuthStore();

    return (
        <>
            <div className={cls.group}>
                <div className={cls.facultsBlock}>
                    <div className={cls.name}>
                        {group.name}
                    </div>
                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
            </div>
            {isOpen && (
                <div className={cls.table}>
                    {userRole === UserRoleEnum.admin && mode === ModeEnum.edit ? (
                        <SheduleTable group={group} />
                    ) : (
                        <SpectateShedule group={group} />  
                    )}
                </div>
            )}
        </>
    );
}

export { Group };
