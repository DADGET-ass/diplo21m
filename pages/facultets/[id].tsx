import Layout from "@/_views/Layout";
import { Facults } from "@/_views/ScheduleComponents/FacultPage";
import { InnerFacultItem } from "@/_views/ScheduleComponents/FacultPage/FacultItem";
import { FacultsHeader } from "@/_views/ScheduleComponents/FacultPage/FacultHeader";
import { Teacher } from "@/_views/ScheduleComponents/TeachersPage/TeacherItem"
import { TeachersHeader } from "@/_views/ScheduleComponents/TeachersPage/TeachersHeader";
import { Arcticle } from "@/_views/ui/Arcticle";
import { IAllTeachers, IFacultets, getFacultets, getTeachers } from "@/data/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FacultetsComponent = () => {

    const [facultets, setFacultets] = useState<IFacultets>();
    const { query } = useRouter();

    const [trigger, setTrigger] = useState<boolean>(false);


    useEffect(() => {
        if (query.id) {
            getFacultets().then(e => {
                setFacultets(e.facultets[0]);
            });
        }

    }, [trigger, query]);
    const facultetsComponent = (
        <>
            {facultets && (
                <Layout title="Факультеты">
                    <Arcticle>
                        <FacultsHeader setTrigger={setTrigger} />
                        <InnerFacultItem facultet={facultets} setTrigger={setTrigger}/>
                    </Arcticle>
                </Layout>

            )}
        </>

    )
    return facultetsComponent;
};

export default FacultetsComponent;