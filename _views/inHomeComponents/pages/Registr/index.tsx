import { Form } from '@/_views/ui/Form';
import cls from './index.module.scss';
import { Button } from '@/_views/ui/Button';
import { Input } from '@/_views/ui/Input';
import { FormEvent, useState } from 'react';
import { registrUser } from '@/data/api';
import { setCookie } from '@/utils/cookies';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { useRouter } from 'next/router';

interface IFormData {
    login: string,
    password: string,
    rePassword: string,
}

const RegistrPage = () => {
    const { setAuth, setUserRole, userRole } = useAuthStore();
    const { push } = useRouter()
    const [formData, setFormData] = useState<IFormData>({
        login: '',
        password: '',
        rePassword: '',
    })
    const [serverMessage, setServerMessage] = useState<string>('')

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.rePassword) {
            return
        }
        registrUser({ username: formData.login, password: formData.password }).then(e => {
            if (e.user) {
                setCookie('token', e.user.token);
                setAuth(true);
                push('/')
            }
            if (userRole !== e.user?.role) {
                setUserRole(e.user?.role || UserRoleEnum.null)
            }
            if (e.message) {
                setServerMessage(e.message)
            }
        })
    }

    const registration = (
        <div className={cls.authBlock}>

            <div className={cls.registrBlock}>
                <Form onSubmit={onSubmit}>
                    <Input type="text" label="Логин" placeholder={'Введите логин'} required value={formData.login} onChange={(value) => setFormData(prev => ({ ...prev, login: value }))} />
                    <Input type="password" label="Пароль" placeholder={'Введите пароль'} required value={formData.password} onChange={(value) => setFormData(prev => ({ ...prev, password: value }))} />
                    <Input type="password" label="Повторите пароль" placeholder={'Повторите пароль'} required value={formData.rePassword} onChange={(value) => setFormData(prev => ({ ...prev, rePassword: value }))} />
                    <Button type='submit'>
                        Вход
                    </Button>
                    {serverMessage && (
                        <div className={cls.error}>
                            {serverMessage}
                        </div>
                    )}
                </Form>
                <div className={cls.aut} onClick={() => push(`/auth`)}>
                    Уже есть аккаунт?
                </div>
            </div>

        </div>
    )
    return registration;
};

export { RegistrPage };