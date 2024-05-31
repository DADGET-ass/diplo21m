import { getCookie } from '../../../utils/cookies/getCookie';
import { methodDefault } from '../defaultAPI';
import { IGroupsFacult } from './getFacultets';


export type IResponseEditGroup = {
    error?: string;
    message?: string;
};

interface EditGroupProps {
    id: string;
    name: string;

};

export const editGroup = ({ id, name }: EditGroupProps): Promise<IResponseEditGroup> =>
    methodDefault({
        path: `facultet/editGroup`,
        method: "POST",
        body: JSON.stringify({
            id,
            name,
        })
    });