import { Arcticle } from "@/_views/ui/Arcticle";
import { AudithoriesHeader } from "./AudithoriesHeader";
import { useEffect, useState } from "react";
import { IAudith, getIAudith } from "@/data/api/audithories/getAudithories";

import cls from './index.module.scss';

const AudithoriesPage = () => {

    const [audithories, setAudithories] = useState<IAudith[]>([]);
    useEffect(() => {
        getIAudith().then(e =>{
            setAudithories(e.audithories);
        })
    },[]);

    const audithoriesPage = (
       
        
        <Arcticle>
            <AudithoriesHeader />
            
            {audithories && audithories.length ? (
                <div className={cls.content}>
                    {/* {audithories?.map((e) => (
                        <Disciplines disciplins={e} key={e.id} />
                    ))} */}
                </div>
            ) : (
                <>
                    Ничего не найдено
                </>
            )}
        </Arcticle>
    );
    return audithoriesPage;
};

export {AudithoriesPage};