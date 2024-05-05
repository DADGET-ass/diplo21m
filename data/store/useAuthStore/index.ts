import { create } from "zustand";

export enum UserRoleEnum {
  user = 'USER',
  admin = 'ADMIN',
  null = 'null',
}

interface AuthState {
  isAuth: boolean;
  userRole: UserRoleEnum;
  setAuth: (isAuth: boolean) => void;
  setUserRole: (userRole: UserRoleEnum) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  userRole: UserRoleEnum.null,
  setAuth: (isAuth) => set({ isAuth }),
  setUserRole: (userRole) => set({ userRole }),
}));