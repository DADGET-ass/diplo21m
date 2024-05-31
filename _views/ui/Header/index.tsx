import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { Tabs } from '../tabs';
import cls from './index.module.scss';

import { LogIn } from '../svg_dynamic/base.svg';
import { useRouter } from 'next/router';



const Header = () => {
    const { push } = useRouter();
    const { userRole } = useAuthStore()
    return (
        <div className={cls.headerLine}>
            <div className={cls.title}>
                <div className={cls.name}>Авиационно-технологический колледж</div>
                {userRole === UserRoleEnum.admin && (
                    <Tabs />
                )}
                <div className={cls.menu}>
                    МЕНЮ
                </div>
            </div>

            <div className={cls.icon} >
                <button className={cls.btnPersonal} onClick={() => push(`/personal`)}>
                    <div className={cls.svg}>
                        <LogIn />
                    </div>
                </button>

                <div className={cls.logo}>
                    <img src="/logo.png" alt="Логотип" />
                </div>
            </div>

        </div>
    );
};

export { Header };