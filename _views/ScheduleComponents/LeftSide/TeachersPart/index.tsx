
import { useEffect, useState } from 'react';
import cls from './index.module.scss';
import { ITeachers, getTeachers } from '@/data/api';
import { Search } from '@/_views/ui/Search';
import { TeacherItem } from './Teachers';

const TeachersPart = () => {
    const [teachers, setTeachers] = useState<Array<ITeachers>>([]);
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        getTeachers().then(e => {
            setTeachers(e.teachers);
        });
    }, []);

    const teachersPart = (
        <>
            <div className={cls.facults}>
                <Search
                    setSearchValue={setSearchValue}
                    searchValue={searchValue}
                />

                {teachers.filter((e) => JSON.stringify(e).toLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1).map((teachers) => (
                    <TeacherItem teachers={teachers} key={teachers._id} searchValue={searchValue} />
                ))}
            </div>
        </>
    );
    return teachersPart;
}
export { TeachersPart };

