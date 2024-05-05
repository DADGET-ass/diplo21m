import { UserRoleEnum } from "@/data/store/useAuthStore";
import { methodDefault } from "../defaultAPI";

interface IResponseCheck {
    user: {
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