import {
    FormEvent,
    useEffect,
    useState
} from 'react';
import { Title } from '@/_views/ui/Title/Index';
import { Arcticle } from '@/_views/ui/Arcticle';
import { Button } from '@/_views/ui/Button';
import { Facults } from '..';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';
import { Form } from '@/_views/ui/Form';
import { addFacults } from '@/data/api';
import { IFacultets, getFacultets } from '@/data/api';
import { TextArea } from '@/_views/ui/textArea';


import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';

import cls from './index.module.scss';
import { Loader } from '@/_views/ui/Loader';

const FacultsPage = () => {
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true);

    const [groups, setGroups] = useState<string>('')
    const [audithories, setAudithories] = useState<string>('')
    const [groupsArray, setGroupsArray] = useState<Array<string>>([])
    const [audithoriesArray, setAudithoriesArray] = useState<Array<string>>([])

    const [facultets, setFacultets] = useState<Array<IFacultets>>([]);

    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()
    useEffect(() => {
        getFacultets().then(e => {
            setFacultets(e.facultets)
            setIsLoading(false)
        })
    }, [isOpenPopUp])

    

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(name, groups, audithories)
        addFacults({ name, groups: groupsArray }).then(e => {
            if (!e.result && e.message) {
                setError(e.message);
                return
            }
            setOpenPopUp(false);
        })
    }

    return isLoading ? <div className={cls.loader}><Loader /></div> : (
        <Arcticle >
            <div className={cls.title}>
                <Title>Факультеты</Title>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <Button darkBtn onClick={() => setOpenPopUp(true)}>Создать</Button>
                )}

            </div>
            <Facults isOpenPopUp={isOpenPopUp} facultets={facultets} />
            {isOpenPopUp && (
                <PopUp title='Создание факультета' setOpenPopUp={setOpenPopUp}>
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"          
                            label="Название"
                            placeholder={''}
                            required
                            value={name}
                            onChange={(value) => setName(value)} 
                            upper
                            />

                        <TextArea
                            type="text"
                            label="Группа"
                            pre={name}
                            value={groups}
                            onChange={(value) => setGroups(value)}
                            setGroupsArray={setGroupsArray}
                        />
                    
                        <Button lightBtn type='submit'>
                            Создать
                        </Button>
                        {error && <span>{error}</span>}
                    </Form>
                </PopUp>
            )}
        </Arcticle >

    );
};

export { FacultsPage };