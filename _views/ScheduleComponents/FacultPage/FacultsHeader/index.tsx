import { Title } from '@/_views/ui/Title/Index';
import cls from './index.module.scss';
import { Arcticle } from '@/_views/ui/Arcticle';
import { Button } from '@/_views/ui/Button';
import { Facults } from '..';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { PopUp } from '@/_views/ui/PopUp';
import { Input } from '@/_views/ui/Input';
import { Form } from '@/_views/ui/Form';
import { addFacults } from '@/data/api/addFacults';
import { IFacultets, getFacultets } from '@/data/api/getFacultets';
import { TextArea } from '@/_views/ui/textArea';


const FacultsPage = () => {
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('')

    const [groups, setGroups] = useState<string>('')
    const [audithories, setAudithories] = useState<string>('')
    const [groupsArray, setGroupsArray] = useState<Array<string>>([])
    const [audithoriesArray, setAudithoriesArray] = useState<Array<string>>([])

    const [facultets, setFacultets] = useState<Array<IFacultets>>([])

    // --------------------------------------------------------

    const [text, setText] = useState<string>('');
    const [group, setGroup] = useState<string>('');
    const handleNameChange = (text: string) => {
        setName(text);
    };
    
    const handleGroupChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newText = (event && event.target && event.target.value) || '';
        const formattedText = newText + "-К";
        setGroup(formattedText);
    };
    
    
    // --------------------------------------------------------

    useEffect(() => {
        getFacultets().then(e => {
            setFacultets(e.facultets)
        })
    }, [isOpenPopUp])

    useEffect(() => {
        const groupArr: Array<string> = []
        for (const _ of groups.split(' ')) {
            if (_ !== '') {
                groupArr.push(_)
            }
        }
        setGroupsArray(groupArr);
    }, [groups])

    useEffect(() => {
        const audithoriesArr: Array<string> = []
        for (const _ of audithories.split(' ')) {
            if (_ !== '') {
                audithoriesArr.push(_)
            }
        }
        setAudithoriesArray(audithoriesArr);
    }, [audithories])



    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(name, groups, audithories)
        addFacults({ name, groups: groupsArray, audithories: audithoriesArray }).then(e => {
            if (!e.result && e.message) {
                setError(e.message);
                return
            }
            setOpenPopUp(false);
        })
    }

    return (
        <Arcticle >
            <div className={cls.title}>
                <Title>Факультеты</Title>
                <Button darkBtn onClick={() => setOpenPopUp(true)}>Создать</Button>
            </div>
            <Facults isOpenPopUp={isOpenPopUp} facultets={facultets} />
            {isOpenPopUp && (
                <PopUp title='Создание факультета' setOpenPopUp={setOpenPopUp}>
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            autoFocus
                            label="Название"
                            placeholder={''}
                            required
                            value={name}
                            onChange={handleNameChange}/>

                        <TextArea
                            type="text"
            
                            label="Группа"
                            value={name}
                            onChange={handleGroupChange}/>
                        {/* <Input type="text" label="Аудитории" placeholder={''} required value={audithories} onChange={(value) => setAudithories(value)} /> */}
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