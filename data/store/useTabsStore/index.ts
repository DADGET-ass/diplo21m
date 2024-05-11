import { create } from "zustand";

export enum ModeEnum {
  edit = 'EDIT',
  spectate = 'SPECTATE',
}

interface TabsState {
  mode: ModeEnum;
  setMode: (mode: ModeEnum) => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  mode: ModeEnum.spectate,
  setMode: (mode) => set({ mode }),
}));
