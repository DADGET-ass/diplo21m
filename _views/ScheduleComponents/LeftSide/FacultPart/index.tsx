import cls from './index.module.scss';
import { Facultets } from './Facults';
export interface IGroups {
    _id: number,
    name: string,
}

export interface ICourses {
    _id: number,
    name: string,
    groups: Array<IGroups>
}

export interface IFacultets {
    _id: number,
    name: string,
    courses: Array<ICourses>;
}

export const facultets: Array<IFacultets> = [
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


const FacultsPart = () => {

    return (
        <div className={cls.facults}>
            {facultets.map((facultets) => (
                <Facultets facultets={facultets} key={facultets._id}/>
            ))}
            
        </div>
    )
}

export { FacultsPart };