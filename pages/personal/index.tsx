import Layout from "@/_views/Layout";
import { PersonalPage } from "@/_views/ScheduleComponents/PersonalPage";
import Link from "next/link";



const Personal = () => {
    const prsonal = (
        <Layout title="Личное">
            <PersonalPage />
        </Layout>
    )
    return prsonal;
}

export default Personal;