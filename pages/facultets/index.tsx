import Layout from "@/_views/Layout";
import { Facults } from "@/_views/ScheduleComponents/FacultPage";
import Link from "next/link";



const Faculties = () => {
    return (
        <Layout title="Факультеты">
            <Facults />
        </Layout>
    )
}

export default Faculties;