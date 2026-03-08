import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

import { IncludedStep, StepConfig } from '../types';
import { getIncludedSteps } from './stepUtils';

export interface BaseSøknadsdata {
    bekrefterVilkår?: boolean;
    bekrefterRiktigeOpplysninger?: boolean;
}

/**
 * Base interface for søknad state.
 * Apps must have a søknadsdata property that is an object extending BaseSøknadsdata.
 */
interface BaseSøknadState<TSøknadsdata extends BaseSøknadsdata> {
    søknadsdata: TSøknadsdata;
}

/**
 * Store actions provided by the framework.
 */
export interface SøknadStoreActions<TState, TSøknadsdata extends object> {
    søknadState: TState | undefined;
    currentStepId?: string;
    includedSteps: IncludedStep[];
    init: (
        initialState: Omit<TState, 'søknadsdata'>,
        mellomlagretSøknadsdata?: TSøknadsdata,
        currentStepId?: string,
    ) => void;
    setSøknadsdata: (data: Partial<TSøknadsdata>) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: string, bekrefterVilkår: true) => void;
    setCurrentStep: (stepId: string) => void;
}

interface StoreOptions<TSøknadsdata> {
    stepOrder: string[];
    stepConfig: StepConfig<TSøknadsdata>;
}

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
 * export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
 *   stepOrder: søknadStepOrder,
 *   stepConfig: søknadStepConfig,
 * });
 * ```
 */
export const createSøknadStore = <
    TState extends BaseSøknadState<TSøknadsdata>,
    TSøknadsdata extends object = Record<string, never>,
>(
    options: StoreOptions<TSøknadsdata>,
): UseBoundStore<StoreApi<SøknadStoreActions<TState, TSøknadsdata>>> => {
    const { stepOrder, stepConfig } = options;

    const computeSteps = (søknadsdata: TSøknadsdata) => getIncludedSteps(stepOrder, stepConfig, søknadsdata);

    const storeCreator: StateCreator<SøknadStoreActions<TState, TSøknadsdata>> = (set) => ({
        søknadState: undefined,
        currentStepId: undefined,
        includedSteps: [],

        init: (initialState, mellomlagretSøknadsdata, currentStepId) => {
            const søknadsdata = mellomlagretSøknadsdata ?? ({} as TSøknadsdata);
            set({
                søknadState: {
                    ...initialState,
                    søknadsdata,
                } as TState,
                currentStepId,
                includedSteps: computeSteps(søknadsdata),
            });
        },

        startSøknad: (firstStepId: string, bekrefterVilkår: true) =>
            set((state) => {
                if (!state.søknadState) return state;
                const søknadsdata = {
                    bekrefterVilkår,
                } as TSøknadsdata;
                return {
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata,
                    },
                    currentStepId: firstStepId,
                    includedSteps: computeSteps(søknadsdata),
                };
            }),

        setSøknadsdata: (data) => {
            set((state) => {
                if (!state.søknadState) return state;
                const søknadsdata = { ...state.søknadState.søknadsdata, ...data };
                return {
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata,
                    } as TState,
                    includedSteps: computeSteps(søknadsdata),
                };
            });
        },

        setCurrentStep: (stepId) => set({ currentStepId: stepId }),

        resetSøknad: () =>
            set((state) => {
                if (!state.søknadState) return state;
                const søknadsdata = {} as TSøknadsdata;
                return {
                    currentStepId: undefined,
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata,
                    } as TState,
                    includedSteps: computeSteps(søknadsdata),
                };
            }),
    });

    return create(storeCreator);
};
