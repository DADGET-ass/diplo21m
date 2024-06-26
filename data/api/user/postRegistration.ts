
import { UserRoleEnum } from "@/data/store/useAuthStore";
import { methodDefault } from "../defaultAPI";

export type IResponseRegistr = {
    user?: {
        token: string,
        role: UserRoleEnum,
    }
    message?: string;
    error?: string;
};

interface registrProps {
    mail: string;
    password: string;
};


export const registrUser = ({ mail, password }: registrProps): Promise<IResponseRegistr> =>
    methodDefault({
        path: `auth/registration`,
        method: "POST",
        body: JSON.stringify({
            mail,
            password
        })
   
    });
