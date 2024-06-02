import { ArrowIcon, CloseIcon } from '@/_views/ui/svg_dynamic/base.svg';
import cls from './index.module.scss';
import {
    Dispatch,
    FC,
    FormEvent,
    SetStateAction,
    useEffect,
    useState
} from 'react';
import { Arcticle } from '@/_views/ui/Arcticle';
import { IDisciplines } from '@/data/api/disciplines/getDisciplines';
import { deleteDisciplines } from '@/data/api/disciplines/deleteDisciplines';
import { UserRoleEnum, useAuthStore } from '@/data/store/useAuthStore';
import { ModeEnum, useTabsStore } from '@/data/store/useTabsStore';
import { Button } from '@/_views/ui/Button';
import { PopUp } from '@/_views/ui/PopUp';
import { Form } from '@/_views/ui/Form';
import { Input } from '@/_views/ui/Input';
import { Checkbox } from '@/_views/ui/Checkbox';
import { editAudith } from '@/data/api/audithories/editAudithories';
import { editDisciplines } from '@/data/api/disciplines/editDisciplines';
import { IGroup } from '@/data/api/disciplines/getDisciplines';
import { addGroupToFacult } from '@/data/api/facultets/addGroupToFacult';
import { IAllTeachers, IFacultets, getFacultets, getTeachers } from '@/data/api';
import { addGroupToDiscipline } from '@/data/api/disciplines/addGroupToDiscipline';
import { DropdownInput } from '@/_views/ui/DropInput';
import { deleteGroup } from '@/data/api/disciplines/deleteGroup';
import { addTeacherToDiscipline } from '@/data/api/disciplines/addTeacherToDiscipline';
import { deleteTeacher } from '@/data/api/disciplines/deleteTeacher';
import { useDateStore } from '@/data/store/useDateStore';


const TeachersCol = ({
    disciplineId,
    teacher,
    setTrigger
}: {
    teacher: {
        _id: string,
        surname: string,
        name: string,
        patronymic: string,
    },
    disciplineId: string,
    setTrigger: Dispatch<SetStateAction<boolean>>,
}) => {

    const teacherDelete = () => {
        deleteTeacher({ disciplineId, teacherId: teacher._id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }
    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()

    return (
        <div className={`${cls.col} ${cls.center}`}>
            <div className={cls.names}>
                <span>{teacher.surname}</span>
                <span>{teacher.name}</span>
                <span>{teacher.patronymic}</span>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <>
                        <div className={cls.close} onClick={teacherDelete}>
                            <CloseIcon />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

const DisciplineForAH = ({ group,
    disciplineId,
    setTrigger,
}: {
    group: IGroup,
    disciplineId: string,
    setTrigger: Dispatch<SetStateAction<boolean>>,
}) => {
    const [newAh, setNewAH] = useState<number>(group.aH)
    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()
    const { selectedDate } = useDateStore()


    const groupDelete = () => {
        deleteGroup({ disciplineId, groupId: group._id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

    const month = group.burden?.filter(e => new Date(e.month).toLocaleDateString('ru-Ru', { month: '2-digit', year: 'numeric' }) === selectedDate.toLocaleDateString('ru-Ru', { month: '2-digit', year: 'numeric' }))[0]?.month
    const hH = group.burden?.filter(e => new Date(e.month).toLocaleDateString('ru-Ru', { month: '2-digit', year: 'numeric' }) === selectedDate.toLocaleDateString('ru-Ru', { month: '2-digit', year: 'numeric' }))[0]?.hH

    return (
        <div className={`${cls.col} ${cls.rr}`}>
            <div className={cls.column}>
                <div key={group._id} className={cls.groupName}>
                    {group.item?.name}
                </div>
                <div className={cls.burden}>
                    <div className={cls.row}>
                        <span>Максимальная нагрузка(ч):</span>
                        <input
                            id="number"
                            type='number'
                            value={newAh}
                            onChange={(e) => Number(e.target.value) <= 300 && setNewAH(Number(e.target.value))}
                            max={300}
                        />
                    </div>
                    <div>
                        {month && new Date(month).toLocaleDateString('ru-Ru', { year: 'numeric', month: '2-digit' })} - {hH}
                    </div>
                </div>
            </div>
            {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                <>
                    <div className={cls.close}>
                        <div onClick={groupDelete}>
                            <CloseIcon />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

interface DisciplinesProps {
    disciplins: IDisciplines;
    setTrigger: Dispatch<SetStateAction<boolean>>
}

const Disciplines: FC<DisciplinesProps> = ({ disciplins, setTrigger }) => {

    const { userRole } = useAuthStore()
    const { mode } = useTabsStore()
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false)
    const [isGroupPopUp, setGroupPopUp] = useState<boolean>(false);
    const [isTeacherPopUp, setTeacherPopUp] = useState<boolean>(false);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [newGroupId, setNewGroupId] = useState<string>('');
    const [newTeacherId, setNewTeacherId] = useState<string>('');
    const [newGroupAh, setNewGroupAh] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [groups, setGroups] = useState<Array<IFacultets>>([]);
    const [teachers, setTeachers] = useState<Array<IAllTeachers>>([]);
    const [formData, setFormData] = useState<{
        name: string;
        pc: boolean,
    }>({
        name: disciplins.name,
        pc: disciplins.pc,
    });

    useEffect(() => {
        getFacultets().then(e => {
            if (e.facultets) {
                setGroups(e.facultets)
            }
        });
        getTeachers({ id: '' }).then(e => {
            if (e.teachers) {
                setTeachers(e.teachers);
            }
        })
    }, [])

    const disciplineDelete = () => {
        deleteDisciplines({ id: disciplins.id }).then(e => {
            if (e.message) {
                setTrigger(prev => !prev)
            }
        })
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        editDisciplines({ id: disciplins.id, name: formData.name, pc: formData.pc }).then(e => {
            if (e.error) {
                setError(e.error);
                return
            }
            setOpenPopUp(false);
            setTrigger(prev => !prev);
        });
    }

    const onSubmitTwo = (e: FormEvent) => {
        e.preventDefault();
        addGroupToDiscipline({
            disciplineId: disciplins.id, groupId: groups.flatMap(group => group.courses)
                .flatMap(course => course.groups)
                .find(group => group.name === newGroupId)?._id || '',
            aH: newGroupAh
        }).then(e => {
            if (e.error) {
                setError(e.error);
                return
            }
            setGroupPopUp(false);
            setTrigger(prev => !prev);
        })

    };
    const onSubmitThree = (e: FormEvent) => {
        e.preventDefault();
        addTeacherToDiscipline({
            disciplineId: disciplins.id,
            teacherId: teachers.filter(e => `${e.surname} ${e.name} ${e.patronymic}` === newTeacherId)[0].id
        }).then(e => {
            if (e.error) {
                setError(e.error);
                return
            }
            setGroupPopUp(false);
            setTrigger(prev => !prev);
        })

    };

    return (
        <Arcticle>
            <div className={cls.disciplinesBlock}>
                <div className={cls.disciplines}>
                    <div className={cls.name}>
                        {disciplins.name}
                        {disciplins.pc && (
                            <p>(Компьютерная дисциплина)</p>
                        )}
                    </div>

                </div>
                <div className={`${cls.arrow} ${isOpen && cls.rot}`} onClick={() => setOpen(prev => !prev)}>
                    <ArrowIcon />
                </div>
                {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                    <>
                        <Button lightBtn onClick={() => setOpenPopUp(true)}>Редактировать</Button>
                        <div className={cls.close} onClick={disciplineDelete}>
                            <CloseIcon />
                        </div>
                    </>
                )}
            </div>

            {isOpen && (
                <div className={cls.groupWrapper}>
                    <div className={cls.groups}>
                        Группы:
                        {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                            <Button lightBtn onClick={() => setGroupPopUp(true)}>Добавить группы</Button>
                        )}
                        {disciplins.groups.map(group => (
                            <DisciplineForAH
                                group={group}
                                disciplineId={disciplins.id}
                                setTrigger={setTrigger}
                            />
                        ))}
                    </div>
                    <div className={cls.teachers}>
                        Преподаватели:
                        {userRole === UserRoleEnum.admin && mode === ModeEnum.edit && (
                            <Button lightBtn onClick={() => setTeacherPopUp(true)}>Добавить преподавателей</Button>
                        )}
                        {disciplins.teachers.map(teacher => (
                            <TeachersCol
                                teacher={teacher}
                                disciplineId={disciplins.id}
                                setTrigger={setTrigger}
                            />
                        ))}
                    </div>
                </div>
            )}

            {isGroupPopUp && (
                <PopUp title='Добавить группу' setOpenPopUp={setGroupPopUp} >
                    <Form onSubmit={onSubmitTwo}>
                        <Input
                            type="text"
                            disabled
                            label="Добавить к дисциплине"
                            value={disciplins.name}
                        />
                        <DropdownInput
                            list={groups.flatMap(e => e.courses.flatMap(e => e.groups).flatMap(e => e.name))}
                            value={newGroupId}
                            setActiveValue={newValue => setNewGroupId(newValue)}
                        />
                        <Input
                            type="number"
                            label="Нагрузка на месяц"
                            placeholder={''}
                            value={newGroupAh.toString()}
                            onChange={(e) => setNewGroupAh(Number(e))}
                        />

                        <Button lightBtn type='submit'>Сохранить</Button>
                    </Form>
                </PopUp>
            )}

            {isTeacherPopUp && (
                <PopUp title='Добавить преподавателя' setOpenPopUp={setTeacherPopUp} >
                    <Form onSubmit={onSubmitThree}>
                        <Input
                            type="text"
                            disabled
                            label="Добавить к дисциплине"
                            value={disciplins.name}
                        />
                        <DropdownInput
                            list={teachers.map(e => `${e.surname} ${e.name} ${e.patronymic}`)}
                            value={newTeacherId}
                            setActiveValue={newValue => setNewTeacherId(newValue)}
                        />

                        <Button lightBtn type='submit'>Сохранить</Button>
                    </Form>
                </PopUp>
            )}

            {isOpenPopUp && (
                <PopUp title='Редактирование дисциплины' setOpenPopUp={setOpenPopUp} >
                    <Form onSubmit={onSubmit}>
                        <Input
                            type="text"
                            disabled
                            label="Текущее название"
                            placeholder={disciplins.name}
                        />
                        <Input
                            type="text"
                            autoFocus
                            label="Новое название"
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
                        {error && error}
                    </Form>
                </PopUp>
            )}
        </Arcticle>
    );
};

export { Disciplines };
