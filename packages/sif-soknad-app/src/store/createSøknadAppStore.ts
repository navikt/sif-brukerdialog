import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

import { IncludedStep, MellomlagringBlob, StepDefinition } from '../types';
import { getIncludedSteps } from '../utils/stepUtils';

export interface SøknadStoreState {
    søknadsdata: Record<string, unknown>;
    formData: Record<string, unknown>;
    currentStepId: string | undefined;
    includedSteps: IncludedStep[];
    søknadSendt: boolean;
    isInitialized: boolean;
}

export interface SøknadStoreActions {
    /** Initialiserer storen fra mellomlagret blob, eller med tom tilstand. */
    init: (mellomlagring: MellomlagringBlob | null) => void;
    /**
     * Trinn 1–6 i commit-algoritmen (rent tilstand, ingen side-effekter).
     * Returnerer ny currentStepId og route slik at kallet etter kan håndtere
     * mellomlagring-PUT og navigering (trinn 7–8).
     */
    commitState: (
        stepId: string,
        data: unknown,
    ) => { newCurrentStepId: string | undefined; newRoute: string | undefined };
    setFormData: (stepId: string, data: unknown) => void;
    clearFormData: (stepId: string) => void;
    setSøknadSendt: () => void;
    reset: () => void;
}

export type SøknadStore = SøknadStoreState & SøknadStoreActions;

interface StoreOptions {
    config: Record<string, StepDefinition>;
    stepOrder: string[];
}

const computeIncludedSteps = (
    stepOrder: string[],
    config: Record<string, StepDefinition>,
    søknadsdata: Record<string, unknown>,
): IncludedStep[] => getIncludedSteps(stepOrder, config, søknadsdata);

const findNextStepAfterCommit = (includedSteps: IncludedStep[], fromStepId: string): string | undefined => {
    const fromIndex = includedSteps.findIndex((s) => s.stepId === fromStepId);
    if (fromIndex === -1) {
        return includedSteps.find((s) => !s.completed)?.stepId;
    }
    const remaining = includedSteps.slice(fromIndex + 1);
    return remaining.find((s) => !s.completed)?.stepId ?? remaining[0]?.stepId;
};

export const createSøknadAppStore = (options: StoreOptions): UseBoundStore<StoreApi<SøknadStore>> => {
    const { config, stepOrder } = options;

    const storeCreator: StateCreator<SøknadStore> = (set, get) => ({
        søknadsdata: {},
        formData: {},
        currentStepId: undefined,
        includedSteps: [],
        søknadSendt: false,
        isInitialized: false,

        init: (mellomlagring) => {
            if (!mellomlagring) {
                set({
                    søknadsdata: {},
                    formData: {},
                    currentStepId: undefined,
                    includedSteps: computeIncludedSteps(stepOrder, config, {}),
                    søknadSendt: false,
                    isInitialized: true,
                });
                return;
            }

            const { søknadsdata, currentStepId } = mellomlagring;
            set({
                søknadsdata,
                formData: {},
                currentStepId,
                includedSteps: computeIncludedSteps(stepOrder, config, søknadsdata),
                søknadSendt: false,
                isInitialized: true,
            });
        },

        commitState: (stepId, data) => {
            const state = get();
            const tidligereInkluderte = state.includedSteps.map((s) => s.stepId);

            // Trinn 1: Oppdater søknadsdata for dette steget
            const oppdatertSøknadsdata = { ...state.søknadsdata, [stepId]: data };

            // Trinn 3: Beregn hvilke steg som nå er inkludert
            const nyInkluderteIds = stepOrder.filter((id) => config[id]?.isIncluded?.(oppdatertSøknadsdata) ?? true);

            // Trinn 4: Slett data for steg som ikke lenger er inkludert
            for (const ekskludertId of tidligereInkluderte) {
                if (!nyInkluderteIds.includes(ekskludertId)) {
                    delete oppdatertSøknadsdata[ekskludertId];
                }
            }
            const oppdatertFormData = { ...state.formData };
            for (const ekskludertId of tidligereInkluderte) {
                if (!nyInkluderteIds.includes(ekskludertId)) {
                    delete oppdatertFormData[ekskludertId];
                }
            }

            // Trinn 5: Reberegn inkluderte steg med oppdatert søknadsdata
            const nyeIncludedSteps = computeIncludedSteps(stepOrder, config, oppdatertSøknadsdata);

            // Trinn 6: Neste currentStepId = første uferdige steg etter dette steget
            const newCurrentStepId = findNextStepAfterCommit(nyeIncludedSteps, stepId);
            const newRoute = newCurrentStepId ? config[newCurrentStepId]?.route : undefined;

            set({
                søknadsdata: oppdatertSøknadsdata,
                formData: oppdatertFormData,
                includedSteps: nyeIncludedSteps,
                currentStepId: newCurrentStepId,
            });

            return { newCurrentStepId, newRoute };
        },

        setFormData: (stepId, data) =>
            set((state) => ({
                formData: { ...state.formData, [stepId]: data },
            })),

        clearFormData: (stepId) =>
            set((state) => {
                const newFormData = { ...state.formData };
                delete newFormData[stepId];
                return { formData: newFormData };
            }),

        setSøknadSendt: () =>
            set({
                søknadSendt: true,
                currentStepId: undefined,
            }),

        reset: () =>
            set({
                søknadsdata: {},
                formData: {},
                currentStepId: undefined,
                includedSteps: computeIncludedSteps(stepOrder, config, {}),
                søknadSendt: false,
                isInitialized: false,
            }),
    });

    return create(storeCreator);
};
