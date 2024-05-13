import { create } from "zustand";

export enum ModeEnum {
  edit = 'EDIT',
  spectate = 'SPECTATE',
}

interface TabsState {
  mode: ModeEnum | null;
  setMode: (mode: ModeEnum) => void;
}

export const useTabsStore = create<TabsState>((set) => ({
  mode: null,
  setMode: (mode) =>  set({ mode }),
}));
