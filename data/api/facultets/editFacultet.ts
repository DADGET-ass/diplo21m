import { getCookie } from '../../../utils/cookies/getCookie';
import { methodDefault } from '../defaultAPI';
import { IGroupsFacult } from './getFacultets';


export type IResponseEditFacults = {
    result?: boolean;
    message?: string;
};

interface editFacultsProps {
    id: string;
    name: string;
    groups: Array<string>;

};

export const editFacults = ({ id, name, groups }: editFacultsProps): Promise<IResponseEditFacults> =>
    methodDefault({
        path: `facultet/edit`,
        method: "POST",
        body: JSON.stringify({
            id,
            name,
            groups,
        })
    });