import { getCookie } from '../../../utils/cookies/getCookie';
import { methodDefault } from '../defaultAPI';


export type IResponseAddFacults = {
    result?: boolean;
    message?: string;
};

interface addFacultsProps {
    name: string;
    groups: Array<string>;
};

export const addFacults = ({ name, groups }: addFacultsProps): Promise<IResponseAddFacults> =>
    methodDefault({
        path: `facultet/add`,
        method: "POST",
        body: JSON.stringify({
            name,
            groups
        })
    });