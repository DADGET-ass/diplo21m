import { methodDefault } from "../defaultAPI";


export interface IDisciplines {
    id: string,
    name: string,
}

type IResponsedisciplines = {
    disciplines: Array<IDisciplines>;
};

export const getDisciplines = ({ id }: { id?: string }): Promise<IResponsedisciplines> =>
    methodDefault({
        path: `discipline/get`,
        method: "GET",
    });

    // ?groupId=${id}