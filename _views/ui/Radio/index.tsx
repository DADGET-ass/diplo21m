import { useState, useEffect } from 'react';
import cls from './index.module.scss';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';


const Radio = () => {
    const { setMode, mode } = useTabsStore();

    const changeTab = (newValue: ModeEnum) => {
        setMode(newValue),
            localStorage.setItem('tabs', newValue)
    }

    useEffect(() => {
        const _mode = localStorage.getItem('tabs')
        setMode(_mode === ModeEnum.edit ? ModeEnum.edit : ModeEnum.spectate)
    }, [])

    return (
        <div className={cls.content}>
            <div className={cls.label}>
                <input
                    type="radio"
                    name="radio"
                    value="1"
                    checked={mode === ModeEnum.spectate}
                    onChange={() => changeTab(ModeEnum.spectate)}
                />
                <div className="name">Просмотр</div>
            </div>
            <div className={cls.label}>
                <input
                    type="radio"
                    name="radio"
                    value="2"
                    checked={mode === ModeEnum.edit}
                    onChange={() => changeTab(ModeEnum.edit)}
                />
                <div className="name">Редактирование</div>
            </div>
        </div>
    );
};

export { Radio };
