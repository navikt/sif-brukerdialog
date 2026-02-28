import { create } from 'zustand';

export interface SøknadState<TSøknadsdata = Record<string, unknown>, TSkjemadata = unknown> {
    // State
    currentStegId: string | null;
    søknadsdata: Partial<TSøknadsdata>;
    currentStegSkjemadata: TSkjemadata | null;
    børMellomlagres: boolean;
    isSubmittingSteg: boolean;
    erSendt: boolean;

    // Actions
    setCurrentSteg: (stegId: string) => void;
    updateSkjemadata: (data: TSkjemadata) => void;
    submitSteg: (stegId: string, søknadsdataForSteg: Partial<TSøknadsdata>) => void;
    setBørMellomlagres: (verdi: boolean) => void;
    setIsSubmittingSteg: (verdi: boolean) => void;
    setSøknadSendt: () => void;
    hydrate: (data: { currentStegId: string; søknadsdata: Partial<TSøknadsdata> }) => void;
    reset: () => void;
}

const initialState = {
    currentStegId: null,
    søknadsdata: {},
    currentStegSkjemadata: null,
    børMellomlagres: false,
    isSubmittingSteg: false,
    erSendt: false,
};

export const createSøknadStore = <TSøknadsdata, TSkjemadata>() =>
    create<SøknadState<TSøknadsdata, TSkjemadata>>((set) => ({
        ...initialState,

        setCurrentSteg: (stegId) =>
            set({
                currentStegId: stegId,
                currentStegSkjemadata: null,
            }),

        updateSkjemadata: (data) =>
            set({
                currentStegSkjemadata: data,
            }),

        submitSteg: (stegId, søknadsdataForSteg) =>
            set((state) => ({
                currentStegId: stegId,
                søknadsdata: { ...state.søknadsdata, ...søknadsdataForSteg },
                currentStegSkjemadata: null,
                børMellomlagres: true,
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
