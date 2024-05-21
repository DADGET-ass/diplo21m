import { getCookie } from '../../../utils/cookies/getCookie';
import { methodDefault } from '../defaultAPI';


export type IResponseAddFacults = {
    result?: boolean;
    message?: string;
};

interface editFacultsProps {
    name: string;
    groups: Array<string>;
    audithories: Array<string>;
};

export const editFacults = ({ name, groups}: editFacultsProps): Promise<IResponseAddFacults> =>
    methodDefault({
        path: `facultet/edit`,
        method: "POST",
        body: JSON.stringify({
            name,
            groups,
        })
    });