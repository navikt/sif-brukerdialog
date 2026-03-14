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

interface SøknadStoreActions<TState, TSøknadsdata extends object, TStepId extends string> {
    søknadState: TState | undefined;
    currentStepId?: TStepId;
    includedSteps: Array<IncludedStep<TStepId>>;
    søknadSendt?: boolean;
    init: (
        initialState: Omit<TState, 'søknadsdata'>,
        mellomlagretSøknadsdata?: TSøknadsdata,
        currentStepId?: TStepId,
    ) => void;
    setSøknadsdata: (data: Partial<TSøknadsdata>) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: TStepId, harForståttRettigheterOgPlikter: true) => void;
    setSøknadSendt: () => void;
    setCurrentStep: (stepId: TStepId) => void;
}

interface StoreOptions<TSøknadsdata, TStepId extends string> {
    stepOrder: TStepId[];
    stepConfig: StepConfig<TStepId, TSøknadsdata>;
}

/**
 * Oppretter en søknadsstore med standard logikk for å håndtere søknadsdata, inkluderte steg og navigasjon.
 */
export const createSøknadStore = <
    TState extends BaseState<TSøknadsdata>,
    TSøknadsdata extends object = Record<string, never>,
    TStepId extends string = string,
>(
    options: StoreOptions<TSøknadsdata, TStepId>,
): UseBoundStore<StoreApi<SøknadStoreActions<TState, TSøknadsdata, TStepId>>> => {
    const { stepOrder, stepConfig } = options;

    const computeSteps = (søknadsdata: TSøknadsdata) => getIncludedSteps(stepOrder, stepConfig, søknadsdata);

    const storeCreator: StateCreator<SøknadStoreActions<TState, TSøknadsdata, TStepId>> = (set) => ({
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

        startSøknad: (firstStepId: TStepId, harForståttRettigheterOgPlikter: true) =>
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
