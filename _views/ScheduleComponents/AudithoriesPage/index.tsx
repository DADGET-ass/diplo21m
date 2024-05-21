import { Arcticle } from "@/_views/ui/Arcticle";
import { AudithoriesHeader } from "./AudithoriesHeader";
import { useEffect, useState } from "react";
import { IAudith, getIAudith } from "@/data/api/audithories/getAudithories";
import { Audithories } from "./Audithories";

import cls from './index.module.scss';
import { Loader } from "@/_views/ui/Loader";

const AudithoriesPage = () => {

    const [audithories, setAudithories] = useState<IAudith[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getIAudith().then(e => {
            setAudithories(e.audithories);
            setIsLoading(false)
        })
    }, []);

    const audithoriesPage = (


        <Arcticle>
            <AudithoriesHeader />
            {audithories && audithories.length ? (
                <div className={cls.content}>
                    {audithories?.map((e) => (
                        <Audithories audithories={e} key={e._id} />
                    ))}
                </div>
            ) : (
                <>
                    Ничего не найдено
                </>
            )}
        </Arcticle>
    );
    return isLoading ? <div className={cls.loader}><Loader /></div> : audithoriesPage;
};

export { AudithoriesPage };