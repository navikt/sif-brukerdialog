import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

interface SubmitStepOptions {
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
    currentStepId?: string;
    init: (
        initialState: Omit<TState, 'søknadsdata'>,
        mellomlagretSøknadsdata?: TSøknadsdata,
        currentStepId?: string,
    ) => void;
    submitStep: (data: Partial<TSøknadsdata>, options?: SubmitStepOptions) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: string) => void;
    isStepCompleted: (stepId: string) => boolean;
    setBørMellomlagres: (verdi: boolean) => void;
    setCurrentStep: (stepId: string) => void;
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
        currentStepId: undefined,

        init: (initialState, mellomlagretSøknadsdata, currentStepId) =>
            set({
                søknadState: {
                    ...initialState,
                    søknadsdata: mellomlagretSøknadsdata ?? ({} as TSøknadsdata),
                } as TState,
                currentStepId,
            }),

        startSøknad: (firstStepId: string) =>
            set((state) => {
                if (!state.søknadState) return state;
                return {
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata: {} as TSøknadsdata,
                    },
                    currentStepId: firstStepId,
                    børMellomlagres: true,
                };
            }),

        submitStep: (data, options) => {
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

        setCurrentStep: (stepId) => set({ currentStepId: stepId }),

        isStepCompleted: (stepId) => {
            const appState = get().søknadState;
            return appState?.søknadsdata[stepId] !== undefined;
        },

        resetSøknad: () =>
            set((state) => {
                if (!state.søknadState) return state;
                return {
                    currentStepId: undefined,
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
