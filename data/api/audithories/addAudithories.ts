import { methodDefault } from "../defaultAPI";



export interface IAudith {
    id: string,
    name: string,
}

type IResponseAudith = {
    audithories: Array<IAudith>;
};

export const addIAudith = (): Promise<IResponseAudith> =>
    methodDefault({
        path: `audithories/add`,
        method: "POST",
    });