import {
    FC,
    useEffect,
    useState
} from 'react';

import { InnerFacultItem } from './FacultItem';

import { IFacultets, getFacultets } from '@/data/api';

import cls from './index.module.scss';
import { Arcticle } from '@/_views/ui/Arcticle';
import { FacultsHeader } from './FacultHeader';
import { Loader } from '@/_views/ui/Loader';


const Facults = () => {
    const [trigger, setTrigger] = useState<boolean>(false);
    const [facultets, setFacultets] = useState<IFacultets[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFacultets().then(e => {
            setFacultets(e.facultets);
            setIsLoading(false)
        })
    }, [trigger]);

    return isLoading ? <div className={cls.loader}><Loader /></div> : (
        <Arcticle>
            <FacultsHeader setTrigger={setTrigger}/>
            {facultets && facultets.length ? (
            <div className={cls.content}>
                {facultets?.map((facultet) => (
                    <InnerFacultItem facultet={facultet} key={facultet._id} setTrigger={setTrigger}/>
                ))}

            </div>
             ) : (
                <>
                    Ничего не найдено
                </>
            )}
        </Arcticle>
    )
    
}

export { Facults };