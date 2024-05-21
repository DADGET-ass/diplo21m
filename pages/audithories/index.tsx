import Layout from "@/_views/Layout";
import { AudithoriesPage } from "@/_views/ScheduleComponents/AudithoriesPage";


const Audithories = () => {
    const audithories = (
            <Layout title="Аудитории">
                <AudithoriesPage />
            </Layout>
    );
    return audithories;
};

export default  Audithories;