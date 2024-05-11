import { methodDefault } from "../../defaultAPI";



export interface ITypes {
    id: string,
    name: string,
}

type IResponsetypes = {
    types: Array<ITypes>;
};

export const addTypes = (): Promise<IResponsetypes> =>
    methodDefault({
        path: `types/add`,
        method: "POST",
    });
