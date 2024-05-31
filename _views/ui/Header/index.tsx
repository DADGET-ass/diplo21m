import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { Tabs } from '../tabs';
import cls from './index.module.scss';

import { LogIn, MenuIcon } from '../svg_dynamic/base.svg';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LeftSide } from '@/_views/ScheduleComponents/LeftSide';



const Header = () => {
    const { push } = useRouter();
    const { userRole } = useAuthStore()

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const toggleMenu = () => {
        const menuElement = document.querySelector('[data-menu]') as HTMLElement;
        if (menuElement) {
            const isVisible = menuElement.getAttribute('data-menu-visible') === 'true';
            menuElement.setAttribute('data-menu-visible', isVisible ? 'false' : 'true');
        }
    };

    return (
        <div className={cls.headerLine}>
            <div className={cls.title}>
                <div className={cls.name}>Авиационно-технологический колледж</div>
                {userRole === UserRoleEnum.admin && (
                    <Tabs />
                )}
                <div className={cls.menu}>
                    
                    <button onClick={toggleMenu}>
          
                    <MenuIcon />
                 
                        </button>
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