import { methodDefault } from "../../defaultAPI";


export interface ITypes {
    id: string,
    name: string,
}

type IResponsetypes = {
    types: Array<ITypes>;
};

export const getTypes = (): Promise<IResponsetypes> =>
    methodDefault({
        path: `types/get`,
        method: "GET",
    });