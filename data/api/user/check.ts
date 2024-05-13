import { UserRoleEnum } from "@/data/store/useAuthStore";
import { methodDefault } from "../defaultAPI";

interface IResponseCheck {
    user: {
        token: { status: string; role: UserRoleEnum; };
        status: string,
        role: UserRoleEnum
    }
    message?: string,
}

export const check = (): Promise<IResponseCheck> =>
    methodDefault({
        path: `auth/check`,
        method: "GET",
    });