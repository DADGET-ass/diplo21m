import Layout from "@/_views/Layout";
import { PersonalPage } from "@/_views/ScheduleComponents/PersonalPage";
import Meta from "@/_views/seo/Meta";
import Link from "next/link";



const Personal = () => {
    const prsonal = (
        <Meta title="Личное">
            <PersonalPage />
        </Meta>
    )
    return prsonal;
}

export default Personal;