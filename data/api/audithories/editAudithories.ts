import { methodDefault } from "../defaultAPI";

interface editAudithParams {
    id:string,
    name: string,
    pc:boolean,
}

type IResponseAudith = {
    error?: string;
    message?: string;
};

export const editAudith = ({ name, id, pc }: editAudithParams): Promise<IResponseAudith> =>
    methodDefault({
        path: `audithories/edit`,
        method: "POST",
        body: JSON.stringify({
            name,
            id,
            pc
        })
    });