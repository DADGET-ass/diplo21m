import Layout from "@/_views/Layout";
import { TeachersPage } from "@/_views/ScheduleComponents/TeachersPage";
import Link from "next/link";



const Teachers = () => {
    return (
        <Layout title="Преподаватели">
            <TeachersPage />
        </Layout>
    )
}

export default Teachers;