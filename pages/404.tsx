
import { Page404 } from "@/_views/ScheduleComponents/Page404";
import Meta from "@/_views/seo/Meta";

const _404Page = () => {
    return (
        <Meta title="Страница не найдена">
            <Page404 />
        </Meta>
    )
}

export default _404Page;