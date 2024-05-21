import { methodDefault } from "../defaultAPI";



export interface IAudith {
    id: string,
    name: string,
}

interface addIAudithParams {
    name: string,
    pc: boolean
}

type IResponseAudith = {
    error?: string;
    message?: string;
};

export const addIAudith = ({ name, pc }: addIAudithParams): Promise<IResponseAudith> =>
    methodDefault({
        path: `audithories/add`,
        method: "POST",
        body: JSON.stringify({
            name,
            pc
        })
    });