import {
    Dispatch,
    SetStateAction,
    FC
} from 'react';

import { Input } from '../Input';
import { CloseIcon, SearchIcon } from '../svg_dynamic/base.svg';
import { IFacultets } from '@/data/api';

import cls from './index.module.scss';

interface SearchProps {
    setSearchValue: Dispatch<SetStateAction<string>>;
    searchValue: string,
}

const Search: FC<SearchProps> = ({ setSearchValue, searchValue }) => {

    const handleClearInput = () => {
        setSearchValue('');
      };

    const searching = (
        <div className={cls.search}>
            <div className={cls.input}>
                <div className={cls.iconSearch}>
                    <SearchIcon />
                </div>
                <Input
                    type='text'
                    placeholder='Поиск'
                    value={searchValue}
                    onChange={(value) => setSearchValue(value as string)}
                />
                <div className={cls.iconCross}>
                    <button onClick={handleClearInput}><CloseIcon /></button>
                </div>
            </div>
        </div>
    );

    return searching;
};

export { Search };
