import { useState } from 'react';
import { Button } from '@/_views/ui/Button';
import { FacultItem } from './FacultItem';
import cls from './index.module.scss';
import { PopUp } from '@/_views/ui/PopUp';

export interface IGroup {
    _id: number,
    name: string,
}

export interface ICourse {
    _id: number,
    name: string,
    groups: Array<IGroup>
}

export interface IFacultet {
    _id: number,
    name: string,
    courses: Array<ICourse>;
}

export const facultets: Array<IFacultet> = [
    {
        _id: 0,
        name: "ПКС",
        courses: [{
            _id: 1,
            name: "Курс 1",
            groups: [{
                _id: 11,
                name: 'ПКС9-К11'
            },
            {
                _id: 22,
                name: 'ПКС9-К12'
            },
            {
                _id: 33,
                name: 'ПКС9-К13'
            },
            {
                _id: 44,
                name: 'ПКС9-К14'
            },]
        },
        {
            _id: 2,
            name: "Курс 2",
            groups: [{
                _id: 11,
                name: 'ПКС9-К21'
            },
            {
                _id: 22,
                name: 'ПКС9-К22'
            },
            {
                _id: 33,
                name: 'ПКС9-К23'
            },]
        }]

    },
    {
        _id: 1,
        name: "ПЛА",
        courses: [{
            _id: 11,
            name: "Курс 4",
            groups: [{
                _id: 111,
                name: 'ПЛА9-К44'
            }]
        }]

    },
]


const Facults = () => {

    return (
        <div className={cls.facults}>
            {facultets.map((facultet) => (
                <FacultItem facultet={facultet} key={facultet._id}/>
            ))}
            
        </div>
    )
}

export { Facults };