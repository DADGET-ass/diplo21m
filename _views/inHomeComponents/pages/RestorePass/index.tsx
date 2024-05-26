import { Form } from '@/_views/ui/Form';
import { Button } from '@/_views/ui/Button';
import { Input } from '@/_views/ui/Input';
import { FormEvent, useState } from 'react';
import { useAuthStore } from '@/data/store/useAuthStore';
import { useRouter } from 'next/router';
import { restorePassword } from '@/data/api/user/restorePassword';

import cls from './index.module.scss';

interface IFormData {
    mail: string;
    password: string;
    rePassword: string;
}

const RestorePage = () => {
    const { setAuth } = useAuthStore();
    const router = useRouter();
    const [formData, setFormData] = useState<IFormData>({
        mail: '',
        password: '',
        rePassword: '',
    });
    const [serverMessage, setServerMessage] = useState<string>('');

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
       
        if (formData.password !== formData.rePassword) {
            setServerMessage('Пароли не совпадают.');

            return;
        }

        try {
            const response = await restorePassword({ mail: formData.mail, password: formData.password });
            if (response.user) {
                setAuth(true);
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
            <div className={cls.restoreBlock}>
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
                        label="Новый пароль" 
                        placeholder="Введите новый пароль" 
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
                        Восстановить
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

export {RestorePage};
