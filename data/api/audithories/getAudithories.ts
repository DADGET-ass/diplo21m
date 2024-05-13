import { methodDefault } from "../defaultAPI";



export interface IAudith {
    _id: string,
    name: string,
}

type IResponseAudith = {
    audithories: Array<IAudith>;
};

export const getIAudith = (): Promise<IResponseAudith> =>
    methodDefault({
        path: `audithories/get`,
        method: "GET",
    });