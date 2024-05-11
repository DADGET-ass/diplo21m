import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { Tabs } from '../tabs';
import cls from './index.module.scss';



const Header = () => {

    const { userRole } = useAuthStore()
    return(
        <div className={cls.headerLine}>
            <div className={cls.title}>
                <div className={cls.name}>Авиационно-технологический колледж</div>
                {userRole === UserRoleEnum.admin && (
                    <Tabs />
                )}
                
            </div>
            <div className={cls.icon}>
                    <img src="/logo.png" alt="Логотип" />
                </div>
        </div>
    );
};

export {Header};