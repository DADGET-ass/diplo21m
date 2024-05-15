import { Arcticle } from "@/_views/ui/Arcticle";
import { AudithoriesHeader } from "./AudithoriesHeader";
import { useEffect, useState } from "react";
import { IAudith, getIAudith } from "@/data/api/audithories/getAudithories";
import { Audithories } from "./Audithories";

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
    return audithoriesPage;
};

export {AudithoriesPage};