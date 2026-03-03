import { create } from 'zustand';

export interface SøknadFlytState {
    currentStegId: string | null;
    børMellomlagres: boolean;
    setCurrentSteg: (stegId: string) => void;
    setBørMellomlagres: (verdi: boolean) => void;
    reset: () => void;
}

const initialState = {
    currentStegId: null,
    børMellomlagres: false,
};

export const useSøknadFlyt = create<SøknadFlytState>((set) => ({
    ...initialState,

    setCurrentSteg: (stegId) => {
        set({
            currentStegId: stegId,
        });
    },

    setBørMellomlagres: (verdi) => {
        set({
            børMellomlagres: verdi,
        });
    },

    reset: () => set(initialState),
}));
