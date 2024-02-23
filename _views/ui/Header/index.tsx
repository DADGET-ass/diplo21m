import cls from './index.module.scss';

const Header = () => {
    return(
        <div className={cls.headerLine}>
            <div className={cls.icon}>
                    <img src="/logo.png" alt="Логотип" />
                </div>
        </div>
    );
};

export {Header};