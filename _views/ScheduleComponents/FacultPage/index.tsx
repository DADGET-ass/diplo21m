import {
    FC,
    useEffect,
    useState
} from 'react';

import { InnerFacultItem } from './FacultItem';

import { IFacultets, getFacultets } from '@/data/api';

import cls from './index.module.scss';

interface FacultsProps {
    isOpenPopUp: boolean;
    facultets: Array<IFacultets>;
}

const Facults: FC<FacultsProps> = ({ facultets }) => {
    const [trigger, setTrigger] = useState<boolean>(false);

    return (
        <div className={cls.content}>

            {facultets?.map((facultet) => (
                <InnerFacultItem facultet={facultet} key={facultet._id} setTrigger={setTrigger}/>
            ))}

        </div>
    )
}

export { Facults };