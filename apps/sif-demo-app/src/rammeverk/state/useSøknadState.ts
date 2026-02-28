import { create } from 'zustand';

export interface SøknadState<TSøknadsdata = Record<string, unknown>> {
    // State
    currentStegId: string | null;
    søknadsdata: Partial<TSøknadsdata>;
    børMellomlagres: boolean;
    isSubmittingSteg: boolean;
    erSendt: boolean;

    // Actions
    setCurrentSteg: (stegId: string) => void;
    submitSteg: (søknadsdataForSteg: Partial<TSøknadsdata>) => void;
    setBørMellomlagres: (verdi: boolean) => void;
    setIsSubmittingSteg: (verdi: boolean) => void;
    setSøknadSendt: () => void;
    hydrate: (data: { currentStegId: string; søknadsdata: Partial<TSøknadsdata> }) => void;
    reset: () => void;
}

const initialState = {
    currentStegId: null,
    søknadsdata: {},
    børMellomlagres: false,
    isSubmittingSteg: false,
    erSendt: false,
};

export const createSøknadStore = <TSøknadsdata>() =>
    create<SøknadState<TSøknadsdata>>((set) => ({
        ...initialState,

        setCurrentSteg: (stegId) =>
            set({
                currentStegId: stegId,
            }),

        submitSteg: (søknadsdataForSteg) =>
            set((state) => ({
                søknadsdata: { ...state.søknadsdata, ...søknadsdataForSteg },
                børMellomlagres: true,
                isSubmittingSteg: false,
            })),

        setBørMellomlagres: (verdi) =>
            set({
                børMellomlagres: verdi,
            }),

        setIsSubmittingSteg: (verdi) =>
            set({
                isSubmittingSteg: verdi,
            }),

        setSøknadSendt: () =>
            set({
                ...initialState,
                erSendt: true,
            }),

        hydrate: (data) =>
            set({
                currentStegId: data.currentStegId,
                søknadsdata: data.søknadsdata,
            }),

        reset: () => set(initialState),
    }));

// Default store for enkel bruk
export const useSøknadState = createSøknadStore();
