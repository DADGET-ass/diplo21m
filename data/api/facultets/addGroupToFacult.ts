import { getCookie } from '../../../utils/cookies/getCookie';
import { methodDefault } from '../defaultAPI';


export type IResponceAddGroupToFacult = {
    error?: string;
    message?: string;
};

interface IAddGroupToFacultParams {
    id: string;
    groupName: string;
};

export const addGroupToFacult = ({ id, groupName }: IAddGroupToFacultParams): Promise<IResponceAddGroupToFacult> =>
    methodDefault({
        path: `facultet/addGroupToFacult`,
        method: "POST",
        body: JSON.stringify({
            id,
            groupName
        })
    });