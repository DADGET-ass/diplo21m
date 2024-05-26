import { getCookie } from '../../../utils/cookies/getCookie';
import { methodDefault } from '../defaultAPI';


export type IResponseAddFacults = {
    result?: boolean;
    message?: string;
};

interface editFacultsProps {
    id: string;
    name: string;
    groups: Array<string>;

};

export const editFacults = ({ id, name, groups }: editFacultsProps): Promise<IResponseAddFacults> =>
    methodDefault({
        path: `facultet/edit`,
        method: "POST",
        body: JSON.stringify({
            id,
            name,
            groups,
        })
    });