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
    mail: string;
    password: string;
    rePassword: string;
}

const RegistrPage = () => {
    const { setAuth, setUserRole, userRole } = useAuthStore();
    const router = useRouter();
    const [formData, setFormData] = useState<IFormData>({
        mail: '',
        password: '',
        rePassword: '',
    });
    const [serverMessage, setServerMessage] = useState<string>('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setServerMessage('Введите корректный e-mail.');

        if (formData.password !== formData.rePassword) {
            setServerMessage('Пароли не совпадают.');

            return;
        }

        try {
            const response = await registrUser({ mail: formData.mail, password: formData.password });


            if (response.user) {
                setCookie('token', response.user.token);
                setAuth(true);
                if (userRole !== response.user.role) {
                    setUserRole(response.user.role || UserRoleEnum.null);
                }
                router.push('/');
            } else if (response.message) {
                setServerMessage(response.message);
            }
        } catch (error) {
            setServerMessage('Ошибка регистрации. Попробуйте ещё раз.');
        
        }
    };

    return (
        <div className={cls.authBlock}>
            <div className={cls.registrBlock}>
                <Form onSubmit={onSubmit}>
                    <Input 
                        type="email" 
                        label="Email" 
                        placeholder="Введите email" 
                        required 
                        value={formData.mail} 
                        onChange={(value) => setFormData(prev => ({ ...prev, mail: value }))} 
                    />
                    <Input 
                        type="password" 
                        label="Пароль" 
                        placeholder="Введите пароль" 
                        required 
                        value={formData.password} 
                        onChange={(value) => setFormData(prev => ({ ...prev, password: value }))} 
                    />
                    <Input 
                        type="password" 
                        label="Повторите пароль" 
                        placeholder="Повторите пароль" 
                        required 
                        value={formData.rePassword} 
                        onChange={(value) => setFormData(prev => ({ ...prev, rePassword: value }))} 
                    />
                    <Button type="submit">
                        Регистрация
                    </Button>
                    {serverMessage && (
                        <div className={cls.error}>
                            {serverMessage}
                        </div>
                    )}
                </Form>
                <div className={cls.aut} onClick={() => router.push(`/auth`)}>
                    Уже есть аккаунт?
                </div>
            </div>
        </div>
    );
};

export {RegistrPage};
