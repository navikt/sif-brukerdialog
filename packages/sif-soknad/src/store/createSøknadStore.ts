import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

import { BaseSøknadsdata, IncludedStep, StepConfig } from '../types';
import { getIncludedSteps } from '../utils';

/**
 * Base type for søknad state.
 * Alle søknader må ha en søknadsdata-egenskap som er et objekt som extends BaseSøknadsdata.
 */
interface BaseState<TSøknadsdata extends BaseSøknadsdata> {
    søknadsdata: TSøknadsdata;
}

interface SøknadStoreActions<TState, TSøknadsdata extends object> {
    søknadState: TState | undefined;
    currentStepId?: string;
    includedSteps: IncludedStep[];
    søknadSendt?: boolean;
    init: (
        initialState: Omit<TState, 'søknadsdata'>,
        mellomlagretSøknadsdata?: TSøknadsdata,
        currentStepId?: string,
    ) => void;
    setSøknadsdata: (data: Partial<TSøknadsdata>) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: string, harForståttRettigheterOgPlikter: true) => void;
    setSøknadSendt: () => void;
    setCurrentStep: (stepId: string) => void;
}

interface StoreOptions<TSøknadsdata> {
    stepOrder: string[];
    stepConfig: StepConfig<TSøknadsdata>;
}

/**
 * Oppretter en søknadsstore med standard logikk for å håndtere søknadsdata, inkluderte steg og navigasjon.
 */
export const createSøknadStore = <
    TState extends BaseState<TSøknadsdata>,
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
                søknadSendt: false,
                includedSteps: computeSteps(søknadsdata),
            });
        },

        startSøknad: (firstStepId: string, harForståttRettigheterOgPlikter: true) =>
            set((state) => {
                if (!state.søknadState) return state;
                const søknadsdata: BaseSøknadsdata = {
                    harForståttRettigheterOgPlikter,
                };
                return {
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata,
                    },
                    søknadSendt: false,
                    currentStepId: firstStepId,
                    includedSteps: computeSteps(søknadsdata as TSøknadsdata),
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
                    søknadSendt: false,
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata,
                    } as TState,
                    includedSteps: computeSteps(søknadsdata),
                };
            }),

        setSøknadSendt: () =>
            set((state) => {
                return {
                    currentStepId: undefined,
                    søknadSendt: true,
                    søknadState: {
                        ...state.søknadState,
                        søknadsdata: {} as TSøknadsdata,
                    } as TState,
                    includedSteps: [],
                };
            }),
    });

    return create(storeCreator);
};
