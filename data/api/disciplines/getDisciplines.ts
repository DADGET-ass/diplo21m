import { methodDefault } from "../defaultAPI";


export interface IDisciplines {
    _id: string,
    name: string,
}

type IResponsedisciplines = {
    disciplines: Array<IDisciplines>;
};

export const getDisciplines = (): Promise<IResponsedisciplines> =>
    methodDefault({
        path: `discipline/get`,
        method: "GET",
    });