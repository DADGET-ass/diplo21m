import { useState, useEffect } from 'react';
import { Facultets } from './Facults';
import { IFacultets, getFacultets } from '@/data/api';
import { Search } from '@/_views/ui/Search';
import cls from './index.module.scss';

const FacultsPart = () => {
    const [facultets, setFacultets] = useState<Array<IFacultets>>([]);
    const [searchValue, setSearchValue] = useState<string>('')

    useEffect(() => {
        getFacultets().then(e => {
            setFacultets(e.facultets);
        });
    }, []);

    return (
        <div className={cls.facults}>
            <Search
                setSearchValue={setSearchValue}
                searchValue={searchValue}
            />

            {facultets.filter((e) => JSON.stringify(e).toLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1).map((facultet) => (
                <Facultets facultets={facultet} key={facultet._id} searchValue={searchValue}/>
            ))}
        </div>
    );
};

export { FacultsPart };
