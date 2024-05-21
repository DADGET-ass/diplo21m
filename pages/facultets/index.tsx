import Layout from "@/_views/Layout";
import { FacultsPage } from "@/_views/ScheduleComponents/FacultPage/FacultsHeader";
import Link from "next/link";



const Faculties = () => {
    return (
        <Layout title="Факультеты">
            <FacultsPage />
        </Layout>
    )
}

export default Faculties;