import { Header } from '@/_views/ui/Header';
import cls from './index.module.scss';
import { LogOut } from '@/_views/ui/svg_dynamic/base.svg';
import { useRouter } from 'next/router';

const PersonalPage = () => {

    const { push } = useRouter();
    const personalPage = (

        <>
            <div className={cls.headerLine}>
                <div className={cls.title}>
                    <div className={cls.name}>Авиационно-технологический колледж</div>

                </div>

                <div className={cls.icon}>
                    <button onClick={() => push(`/`)}>
                        <div className={cls.svg}>
                            <LogOut />
                        </div>
                    </button>
                    <img src="/logo.png" alt="Логотип" />
                </div>
            </div>

            <div className={cls.content}>
                <div className={cls.block}>
                    <div className={cls.photo}>
                        <div className={cls.img}></div>
                    </div>
                    <div className={cls.infoBlock}>
                        <div className={cls.info}>
                            <div className={cls.item}>
                                ФИО
                                <p> _________________________</p>
                            </div>
                            <div className={cls.item}>
                                Группа
                                <p> _________________________</p>
                            </div>
                            <div className={cls.item}>
                                Курс
                                <p> _________________________</p>
                            </div>
                            <div className={cls.item}>
                                Номер зачётной книжки
                                <p> _________________________</p>
                            </div>
                            <div className={cls.item}>
                                Факультет
                                <p> _________________________</p>
                            </div>
                            <div className={cls.item}>
                                Дата рождения
                                <p> _________________________</p>
                            </div>
                            <div className={cls.item}>
                                E-mail
                                <p> _________________________</p>
                            </div>
                            <div className={cls.item}>
                                Номер телефона
                                <p> _________________________</p>
                            </div>
                            <div className={cls.item}>
                                Год поступления
                                <p> _________________________</p>
                            </div>
                        </div>
                        <div className={cls.assessment}>
                            Средний балл
                            <p> _________________________</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    return personalPage;
};

export { PersonalPage };