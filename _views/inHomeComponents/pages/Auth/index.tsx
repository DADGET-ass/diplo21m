import { FormEvent } from 'react';
import { Header } from '@/_views/ui/Header';
import { Button } from '@/_views/ui/Button';
import { Input } from '@/_views/ui/Input';
import { Form } from '@/_views/ui/Form';
import cls from './index.module.scss';

const Auth = () => {

    const onSubmit = (e: FormEvent) => {
        e.stopPropagation()
        // запрос
    }

    return (

        <div className={cls.authBlock}>

            <div className={cls.loginBlock}>
                <Form onSubmit={onSubmit}>
                    <Input type="text" label="Логин" autoFocus placeholder={'Введите логин'} required/>
                    <Input type="password" label="Пароль" placeholder={'Введите пароль'} required/>
                </Form>
                <Button type='submit'>
                    Вход
                </Button>
            </div>

        </div>
    );
}

export { Auth };