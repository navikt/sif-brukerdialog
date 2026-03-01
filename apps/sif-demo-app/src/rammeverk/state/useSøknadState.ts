import { create } from 'zustand';

export interface SøknadFlytState {
    currentStegId: string | null;
    børMellomlagres: boolean;
    erSendt: boolean;

    setCurrentSteg: (stegId: string) => void;
    setBørMellomlagres: (verdi: boolean) => void;
    setSøknadSendt: () => void;
    reset: () => void;
}

const initialState = {
    currentStegId: null,
    børMellomlagres: false,
    erSendt: false,
};

export const useSøknadFlyt = create<SøknadFlytState>((set) => ({
    ...initialState,

    setCurrentSteg: (stegId) =>
        set({
            currentStegId: stegId,
        }),

    setBørMellomlagres: (verdi) =>
        set({
            børMellomlagres: verdi,
        }),

    setSøknadSendt: () =>
        set({
            ...initialState,
            erSendt: true,
        }),

    reset: () => set(initialState),
}));
