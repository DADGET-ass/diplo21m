import { Arcticle } from "@/_views/ui/Arcticle";
import { AudithoriesHeader } from "./AudithoriesHeader";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { IAudith, getIAudith } from "@/data/api/audithories/getAudithories";
import { Audithories } from "./Audithories";

import cls from './index.module.scss';
import { Loader } from "@/_views/ui/Loader";



const AudithoriesPage = () => {
    const [trigger, setTrigger] = useState<boolean>(false);
    const [audithories, setAudithories] = useState<IAudith[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getIAudith().then(e => {
            setAudithories(e.audithories);
            setIsLoading(false)
        })
    }, [isOpenPopUp, trigger]);

    const audithoriesPage = (


        <Arcticle>
            <AudithoriesHeader isOpenPopUp={isOpenPopUp} setOpenPopUp={setOpenPopUp}/>
            {audithories && audithories.length ? (
                <div className={cls.content}>
                    {audithories?.map((e) => (
                        <Audithories audithories={e} key={e._id} setTrigger={setTrigger}/>
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