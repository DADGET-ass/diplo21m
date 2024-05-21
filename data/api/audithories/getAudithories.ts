import { methodDefault } from "../defaultAPI";



export interface IAudith {
    _id: string,
    name: string,
    pc:boolean,
}

type IResponseAudith = {
    audithories: Array<IAudith>;
};

export const getIAudith = (): Promise<IResponseAudith> =>
    methodDefault({
        path: `audithories/get`,
        method: "GET",
    });