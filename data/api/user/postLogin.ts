
import { UserRoleEnum } from "@/data/store/useAuthStore";
import { methodDefault } from "../defaultAPI";

export type IResponseLogin = {
    user?: {
        token: string,
        role: UserRoleEnum,
    }
    message?: string;
};

interface loginProps {
    username: string;
    password: string;
};

export const authUser = ({ username, password }: loginProps): Promise<IResponseLogin> =>
    methodDefault({
        path: `auth/login`,
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    });