
import { useRouter } from 'next/router';
import cls from './index.module.scss';

const Page404 = () => {
    const { back } = useRouter();

    return (
        <section className={cls.page_404}>
            <div className={cls.container}>
                <div className={cls.row}>
                    <div>
                        <div>
                            <div className={cls.fourZeroFourBg}>
                                <h1 className={cls.textCenter}>404</h1>
                            </div>

                            <div className={cls.contantBox404}>
                                <h3>
                                    Кажется вы потерялись
                                </h3>

                                <p>страница, которую вы ищете, недоступна!</p>

                                <div className={cls.link404} onClick={() => back()}>Назад</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { Page404 };
