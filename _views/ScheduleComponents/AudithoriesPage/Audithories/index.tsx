import { ArrowIcon, CloseIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { Arcticle } from '@/_views/ui/Arcticle';
import { IDisciplines, getDisciplines } from '@/data/api/disciplines/getDisciplines';
import { IAudith } from '@/data/api/audithories/getAudithories';
import { Button } from '@/_views/ui/Button';
import { PopUp } from '@/_views/ui/PopUp';
import { Form } from '@/_views/ui/Form';
import { Input } from '@/_views/ui/Input';
import { Checkbox } from '@/_views/ui/Checkbox';
import { editAudith } from '@/data/api/audithories/editAudithories';
import { deleteAudithories } from '@/data/api/audithories/deleteAudithories';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';

interface AudithoriesProps {
    audithories: IAudith;
    setTrigger: Dispatch<SetStateAction<boolean>>
}

const Audithories: FC<AudithoriesProps> = ({ audithories, setTrigger }) => {

    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false)
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<{
        name: string,
        pc: boolean,
    }>({
        name: audithories.name,
        pc: audithories.pc,
    });

    const audithoriesDelete = () => {
        deleteAudithories({ id: audithories._id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        editAudith({ id: audithories._id, name: formData.name, pc: formData.pc }).then(e => {
            if (e.error) {
                setError(e.error);
                return
            }
            setOpenPopUp(false);
            setTrigger(prev => !prev);
        });
    }

    const audithorie = (
        <Arcticle>
            <div className={cls.audithoriesBlock}>
                <div className={cls.audithories}>
                    <div className={cls.name}>
                        Номер: {audithories.name}
                    </div>
                    <div className={cls.pc}>
                        {audithories.pc ? 'Компьютерная аудитория' : 'Обычная'}
                    </div>
                </div>

                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <div className={cls.btnBlock}>
                        <Button lightBtn onClick={() => setOpenPopUp(true)}>Редактировать</Button>
                        <div className={cls.close} onClick={audithoriesDelete}>
                            <CloseIcon />
                        </div>

                    </div>
                )}

            </div>

            {isOpenPopUp && (
                <PopUp title='Редактирование аудитории' setOpenPopUp={setOpenPopUp} >
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            disabled
                            label="Текущий номер"
                            placeholder={audithories.name}
                        />
                        <Input
                            type="text"
                            autoFocus
                            label="Новый номер"
                            placeholder={''}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e }))}
                        />
                        <Checkbox
                            value="pc"
                            checked={formData.pc}
                            onChange={() => setFormData(prev => ({ ...prev, pc: !prev.pc }))}
                            name='pc'
                        >
                            Компьютерная аудитория
                        </Checkbox>
                        <Button lightBtn type='submit'>Сохранить</Button>
                    </Form>
                </PopUp>
            )}
        </Arcticle>
    );
    return audithorie;
};

export { Audithories };