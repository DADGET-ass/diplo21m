import { create } from "zustand";

interface AuthState {
  isAuth: boolean;
  setAuth: (isAuth: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: false,
  setAuth: (isAuth) => set({ isAuth }),
}));