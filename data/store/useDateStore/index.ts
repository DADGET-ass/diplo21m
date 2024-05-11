import { create } from 'zustand';

const today = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const today = `${year}-${month}-${day}`;
    return today;
}

interface IDateStore {
    today: string;
    date: string;
    selectedDate: Date;
    setDate: (value: string) => void;
    moveMonth: (increment: number) => void;
    setSelectedDate: (date: Date) => void;
}

export const useDateStore = create<IDateStore>((set) => ({
    today: today(),
    date: today(),
    selectedDate: new Date(),
    setDate: (date: string) => set({ date }),
    moveMonth: (increment: number) => {
        set((state) => {
            const currentDate = new Date(state.date);
            currentDate.setMonth(currentDate.getMonth() + increment);
            const year = currentDate.getFullYear();
            const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
            const day = ('0' + currentDate.getDate()).slice(-2);
            const newDate = `${year}-${month}-${day}`;

            return { date: newDate };
        });
    },
    setSelectedDate: (selectedDate: Date) => set({ selectedDate }),
}));