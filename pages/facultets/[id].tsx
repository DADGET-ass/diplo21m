import { Facults } from "@/_views/ScheduleComponents/FacultPage";
import { FacultsPart } from "@/_views/ScheduleComponents/LeftSide/FacultPart";
import { Arcticle } from "@/_views/ui/Arcticle";
import { Button } from "@/_views/ui/Button";
import { Input } from "@/_views/ui/Input";
import { Layout } from "@/_views/ui/Layout";
import { PopUp } from "@/_views/ui/PopUp";
import { Title } from "@/_views/ui/Title/Index";
import { FormEvent, useEffect, useState } from "react";
import cls from '@/_views/ScheduleComponents/FacultPage/FacultsHeader/index.module.scss'
import { useRouter } from "next/router";
import { IFacultets } from "@/data/api/getFacultets";
import { getFacultet } from "@/data/api/getFacultet";
import { Form } from "@/_views/ui/Form";
import { addFacults } from "@/data/api/addFacults";



const FacultComponent = () => {
    const [message, setMessage] = useState<string>('');
    const [name, setName] = useState<string>('')
    const [groups, setGroups] = useState<string>('')
    const [audithories, setAudithories] = useState<string>('')
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const {query} = useRouter();
    const [groupsArray, setGroupsArray] = useState<Array<string>>([])
    const [audithoriesArray, setAudithoriesArray] = useState<Array<string>>([])
    const [facultet, setFacultet] = useState<Array<IFacultets>>([])

    useEffect(() => {
        if (!query.id) {
            return
        }
        getFacultet({id: query.id?.toString()}).then(e =>{
            setFacultet(e.facultet)
        })
    }, [isOpenPopUp, query])

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
            if (e.message) {
                setMessage(e.message);
            }
            if (!e.result) {
                return
            }
            setOpenPopUp(false);
        })
    }

    return (
        <Layout>

            <Arcticle >
                <div className={cls.title}>
                    <Title>Факультеты</Title>
                    <Button darkBtn onClick={() => setOpenPopUp(true)}>Создать</Button>
                </div>
                <Facults facultets={facultet} isOpenPopUp={isOpenPopUp}/>
                {isOpenPopUp && (
                    <PopUp title='Создание факультета' setOpenPopUp={setOpenPopUp}>
                    <Form onSubmit={onSubmit}>
                        <Input type="text" autoFocus label="Название" placeholder={''} required value={name} onChange={(value) => setName(value)} />
                        <Input type="text" label="Группы" placeholder={''} required value={groups} onChange={(value) => setGroups(value)} />
                        <Input type="text" label="Аудитории" placeholder={''} required value={audithories} onChange={(value) => setAudithories(value)} />
                        <Button lightBtn type='submit'>
                            Создать
                        </Button>
                        {message && <span>{message}</span>}
                    </Form>
                </PopUp>
                )}
            </Arcticle >
        </Layout>
    );
};

export default FacultComponent;