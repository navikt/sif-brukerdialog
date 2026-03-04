import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

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
    currentStepId?: string;
    init: (
        initialState: Omit<TState, 'søknadsdata'>,
        mellomlagretSøknadsdata?: TSøknadsdata,
        currentStepId?: string,
    ) => void;
    setSøknadsdata: (data: Partial<TSøknadsdata>) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: string) => void;
    isStepCompleted: (stepId: string) => boolean;
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
                };
            }),

        setSøknadsdata: (data) => {
            set((state) => {
                if (!state.søknadState) return state;
                return {
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata: { ...state.søknadState.søknadsdata, ...data },
                    } as TState,
                };
            });
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
    });

    return create(storeCreator);
};
