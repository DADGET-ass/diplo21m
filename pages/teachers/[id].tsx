import Layout from "@/_views/Layout";
import { Teacher } from "@/_views/ScheduleComponents/TeachersPage/TeacherItem"
import { TeachersHeader } from "@/_views/ScheduleComponents/TeachersPage/TeachersHeader";
import { Arcticle } from "@/_views/ui/Arcticle";
import { IAllTeachers, getTeachers } from "@/data/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TeachersComponent = () => {

    const [teachers, setTeachers] = useState<IAllTeachers>();
    const { query } = useRouter();

    const [trigger, setTrigger] = useState<boolean>(false);


    useEffect(() => {
        if (query.id) {
            getTeachers({ id: query.id?.toString() }).then(e => {
                setTeachers(e.teachers[0]);
            });
        }

    }, [trigger, query]);
    const teachersComponent = (
        <>
            {teachers && (
                <Layout title="Преподаватели">
                    <Arcticle>
                    <TeachersHeader setTrigger={setTrigger} />
                    <Teacher teacher={teachers} setTrigger={setTrigger}/>
                    </Arcticle>
                </Layout>

            )}
        </>

    )
    return teachersComponent;
};

export default TeachersComponent;