
import { UserRoleEnum } from "@/data/store/useAuthStore";
import { methodDefault } from "../defaultAPI";

export type IResponseRestore = {
    user?: {
        token: string,
        role: UserRoleEnum,
    }
    message?: string;
    error?: string;
};

interface restoreProps {
    mail: string;
    password: string;
};


export const restorePassword = ({ mail, password }: restoreProps): Promise<IResponseRestore> =>
    methodDefault({
        path: `auth/restorePass`,
        method: "POST",
        body: JSON.stringify({
            mail,
            password
        })
   
    });
