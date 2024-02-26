import { Title } from '@/_views/ui/Title/Index';
import cls from './index.module.scss';
import { Arcticle } from '@/_views/ui/Arcticle';
import { Button } from '@/_views/ui/Button';
import { Facults } from '..';
import { useState } from 'react';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';

const FacultsPage = () => {
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    return (
        <Arcticle >
            <div className={cls.title}>
                <Title>Факультеты</Title>
                <Button darkBtn onClick={() => setOpenPopUp(true)}>Создать</Button>
            </div>
            <Facults />
            {isOpenPopUp && (
                <PopUp title='Создание факультета' setOpenPopUp={setOpenPopUp}>
                     <Input type="text" autoFocus label="Название" placeholder={''} />
                     <Input type="text" label="Группы" placeholder={''} />
                     <Input type="text" label="Аудитории" placeholder={''} />
                     <Button lightBtn>Создать</Button>
                </PopUp>
            )}
        </Arcticle >
        
    );
};

export { FacultsPage };