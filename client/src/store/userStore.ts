import { create } from "zustand";

interface UserState {
    username: string | null;
    authLoader: boolean;
    setUsername: (username: string | null) => void;
    setAuthLoader: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
    username: null,
    authLoader: false,
    setUsername: (username) => set({ username }),
    setAuthLoader: (authLoader) => set({ authLoader }),
}));
