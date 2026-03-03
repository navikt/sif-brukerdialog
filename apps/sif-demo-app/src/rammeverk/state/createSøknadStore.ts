import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

interface SubmitStegOptions {
    onSuccess?: () => void;
}

/**
 * Base interface for søknad state.
 * Apps must have a søknadsdata property that is an object.
 */
export interface BaseSøknadState<TSøknadsdata extends object> {
    søknadsdata: TSøknadsdata;
}

/**
 * Store actions provided by the framework.
 */
export interface SøknadStoreActions<TState, TSøknadsdata extends object> {
    søknadState: TState | undefined;
    børMellomlagres: boolean;
    currentStegId?: string;
    setCurrentSteg: (stegId: string) => void;
    init: (initialState: Omit<TState, 'søknadsdata'>, mellomlagretSøknadsdata?: TSøknadsdata) => void;
    submitSteg: (data: Partial<TSøknadsdata>, options?: SubmitStegOptions) => void;
    resetSøknad: () => void;
    erStegFullført: (stegId: string) => boolean;
    setBørMellomlagres: (verdi: boolean) => void;
}

type EmptySøknadsdata = Record<string, never>;

/**
 * Creates a typed søknad store with common functionality.
 *
 * @example
 * ```typescript
 * interface SøknadState {
 *   søker: Søker;
 *   barn: RegistrertBarn[];
 *   søknadsdata: Søknadsdata;
 * }
 *
 * export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>();
 * ```
 */
export const createSøknadStore = <
    TState extends BaseSøknadState<TSøknadsdata>,
    TSøknadsdata extends object = EmptySøknadsdata,
>(): UseBoundStore<StoreApi<SøknadStoreActions<TState, TSøknadsdata>>> => {
    const storeCreator: StateCreator<SøknadStoreActions<TState, TSøknadsdata>> = (set, get) => ({
        søknadState: undefined,
        børMellomlagres: false,
        currentStegId: undefined,

        init: (initialState, mellomlagretSøknadsdata) =>
            set({
                søknadState: {
                    ...initialState,
                    søknadsdata: mellomlagretSøknadsdata ?? ({} as TSøknadsdata),
                } as TState,
            }),

        submitSteg: (data, options) => {
            set((state) => {
                if (!state.søknadState) return state;
                return {
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata: { ...state.søknadState.søknadsdata, ...data },
                    } as TState,
                    børMellomlagres: true,
                };
            });
            options?.onSuccess?.();
        },

        setCurrentSteg: (stegId) => set({ currentStegId: stegId }),

        erStegFullført: (stegId) => {
            const appState = get().søknadState;
            return appState?.søknadsdata[stegId] !== undefined;
        },

        resetSøknad: () =>
            set((state) => {
                if (!state.søknadState) return state;
                return {
                    currentStegId: undefined,
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata: {} as TSøknadsdata,
                    } as TState,
                };
            }),

        setBørMellomlagres: (verdi) => set({ børMellomlagres: verdi }),
    });

    return create(storeCreator);
};
