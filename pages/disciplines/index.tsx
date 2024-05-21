import Layout from "@/_views/Layout";
import { DisciplinesPage } from "@/_views/ScheduleComponents/DisciplinesPage";

const Disciplines = () =>{
    const disciplines =(
        <Layout title="Дисциплины">
            <DisciplinesPage />
        </Layout>
    );
    return disciplines;
};

export default Disciplines;