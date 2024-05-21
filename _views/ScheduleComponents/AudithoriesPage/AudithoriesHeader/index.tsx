import { Button } from "@/_views/ui/Button";
import { Title } from "@/_views/ui/Title/Index";
import { UserRoleEnum, useAuthStore } from "@/data/store/useAuthStore";
import { ModeEnum, useTabsStore } from "@/data/store/useTabsStore";

import cls from './index.module.scss';
import { PopUp } from "@/_views/ui/PopUp";
import { Form } from "@/_views/ui/Form";
import { Input } from "@/_views/ui/Input";
import { FormEvent, useState } from "react";
import { Checkbox } from "@/_views/ui/Checkbox";
import { addIAudith } from "@/data/api";

const AudithoriesHeader = () => {

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [pc, setPc] = useState<boolean>(false);

    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        addIAudith({ name, pc }).then(e => {
            if (e.error) {
                setError(e.error);
                return
            }
            setOpenPopUp(false)
        })
    }

    const audithoriesHeader = (
        <>
            <div className={cls.title}>
                <Title>Аудитории</Title>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <Button darkBtn onClick={() => setOpenPopUp(true)}>Создать</Button>
                )}

            </div>
            {isOpenPopUp && (
                <PopUp title='Создание аудитории' setOpenPopUp={setOpenPopUp}>
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            autoFocus
                            label="Название"
                            placeholder={''}
                            value={name}
                            onChange={(value) => setName(value as string)} />
                        <Checkbox value="pc" checked={pc} onChange={() => setPc(prev => !prev)} name='pc'>Компьютерная аудитория</Checkbox>
                        {/* <p>Учителя</p>
                        
                            <DropdownInput
                                list={teachers.map(e => `${e.surname} ${e.name} ${e.patronymic}`)}
                                value={teacherName}
                                setActiveValue={newValue => setTeacherName(newValue)}
                            />
                        

                        <p>Группы</p>
                        
                            <DropdownInput
                                list={groups.map(e => e.name)}
                                value={groupName}
                                setActiveValue={newValue => setGroupName(newValue)}
                            /> */}


                        <Button lightBtn type='submit'>
                            Создать
                        </Button>
                        {error && <span>{error}</span>}
                    </Form>
                </PopUp>)
            }
        </>
    );
    return audithoriesHeader;
};
export { AudithoriesHeader };