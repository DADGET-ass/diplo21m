
import { UserRoleEnum } from "@/data/store/useAuthStore";
import { methodDefault } from "../defaultAPI";

export type IResponseRegistr = {
    user?: {
        token: string,
        role: UserRoleEnum,
    }
    message?: string;
};

interface registrProps {
    username: string;
    password: string;
};


export const registrUser = ({ username, password }: registrProps): Promise<IResponseRegistr> =>
    methodDefault({
        path: `auth/registration`,
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    });