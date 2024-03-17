import cls from './index.module.scss';
import { Facultets } from './Facults';
import { useEffect, useState } from 'react';
import { IFacultets, getFacultets } from '@/data/api/getFacultets';

const FacultsPart = () => {

    const [facultets, setFacultets] = useState<Array<IFacultets>>([])

    useEffect(() => {
        getFacultets().then(e =>{
            setFacultets(e.facultets)
        })
    }, [])

    return (
        <div className={cls.facults}>
            {facultets.map((facultets) => (
                <Facultets facultets={facultets} key={facultets._id}/>
            ))}
            
        </div>
    )
}

export { FacultsPart };