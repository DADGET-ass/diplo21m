import { methodDefault } from "../defaultAPI";

interface IEditDisciplines {
    id: string,
    name: string,
    pc: boolean
}

type IResponsedisciplines = {
    message?: string;
    error?: string;
};

export const editDisciplines = ({ id, name, pc }: IEditDisciplines): Promise<IResponsedisciplines> =>
    methodDefault({
        path: `discipline/edit`,
        method: "POST",
        body: JSON.stringify({
            id,
            name,
            pc
        })
    });
