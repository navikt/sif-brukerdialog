import { create } from 'zustand';

export interface SøknadFlytState {
    currentStegId: string | null;
    setCurrentSteg: (stegId: string) => void;
    reset: () => void;
}

const initialState = {
    currentStegId: null,
};

export const useSøknadFlyt = create<SøknadFlytState>((set) => ({
    ...initialState,

    setCurrentSteg: (stegId) => {
        set({
            currentStegId: stegId,
        });
    },

    reset: () => set(initialState),
}));
