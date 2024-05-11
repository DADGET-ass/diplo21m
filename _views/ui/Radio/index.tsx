import React, { useState } from 'react';
import cls from './index.module.scss';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';


const Radio = () => {
    const [selectedTab, setSelectedTab] = useState(1);
    const { setMode } = useTabsStore();

    const changeTab = (newValue: number) => {
        setSelectedTab(newValue);
        if (newValue === 1) {
            setMode(ModeEnum.spectate);
            return
        }
        setMode(ModeEnum.edit);
    }

    return (
        <div className={cls.content}>
            <div className={cls.label}>
                <input
                    type="radio"
                    name="radio"
                    value="1"
                    checked={selectedTab === 1}
                    onChange={() => changeTab(1)}
                />
                <div className="name">Просмотр</div>
            </div>
            <div className={cls.label}>
                <input
                    type="radio"
                    name="radio"
                    value="2"
                    checked={selectedTab === 2}
                    onChange={() => changeTab(2)}
                />
                <div className="name">Редактирование</div>
            </div>
        </div>
    );
};

export { Radio };
