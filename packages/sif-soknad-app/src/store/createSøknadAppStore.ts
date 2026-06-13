import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

import { IncludedStep, MellomlagringBlob, StepDefinition } from '../types';
import { getIncludedSteps } from '../utils/stepUtils';

export interface SøknadStoreState {
    /** Committet søknadsdata per steg — oppdateres kun ved submit. Domeneverdier, ikke rå skjemaverdier. */
    søknadsdata: Record<string, unknown>;
    /**
     * Midlertidige RHF-skjemaverdier per steg — lagres til/leses fra mellomlagring-blob.
     * Brukes som `defaultValues` etter reload slik at brukeren ikke mister utfylte verdier.
     * Nøkkel: stepId. Ryddes for et steg ved commit eller reset.
     */
    draftFormValues: Record<string, Record<string, unknown>>;
    /** Hvilket steg som er "aktivt" (neste steg som ikke er fullført). */
    currentStepId: string | undefined;
    /** Beregnede inkluderte steg med completed-flag — utledet fra søknadsdata + config. */
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
    /** Rydder draft-verdier for ett steg (etter commit eller ved reset). */
    clearDraftFormValues: (stepId: string) => void;
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
    return includedSteps[fromIndex + 1]?.stepId;
};

export const createSøknadAppStore = (options: StoreOptions): UseBoundStore<StoreApi<SøknadStore>> => {
    const { config, stepOrder } = options;

    const storeCreator: StateCreator<SøknadStore> = (set, get) => ({
        søknadsdata: {},
        draftFormValues: {},
        currentStepId: undefined,
        includedSteps: [],
        søknadSendt: false,
        isInitialized: false,

        init: (mellomlagring) => {
            if (!mellomlagring) {
                set({
                    søknadsdata: {},
                    draftFormValues: {},
                    currentStepId: undefined,
                    includedSteps: computeIncludedSteps(stepOrder, config, {}),
                    søknadSendt: false,
                    isInitialized: true,
                });
                return;
            }

            const { søknadsdata, currentStepId, draftFormValues } = mellomlagring;
            set({
                søknadsdata,
                draftFormValues: draftFormValues ?? {},
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

            // Trinn 5: Reberegn inkluderte steg med oppdatert søknadsdata
            const nyeIncludedSteps = computeIncludedSteps(stepOrder, config, oppdatertSøknadsdata);

            // Trinn 6: Neste currentStepId = første uferdige steg etter dette steget
            const newCurrentStepId = findNextStepAfterCommit(nyeIncludedSteps, stepId);
            const newRoute = newCurrentStepId ? config[newCurrentStepId]?.route : undefined;

            set({
                søknadsdata: oppdatertSøknadsdata,
                includedSteps: nyeIncludedSteps,
                currentStepId: newCurrentStepId,
            });

            return { newCurrentStepId, newRoute };
        },

        clearDraftFormValues: (stepId) =>
            set((state) => {
                const newDraft = { ...state.draftFormValues };
                delete newDraft[stepId];
                return { draftFormValues: newDraft };
            }),

        setSøknadSendt: () =>
            set({
                søknadSendt: true,
                currentStepId: undefined,
                draftFormValues: {},
            }),

        reset: () =>
            set({
                søknadsdata: {},
                draftFormValues: {},
                currentStepId: undefined,
                includedSteps: computeIncludedSteps(stepOrder, config, {}),
                søknadSendt: false,
                isInitialized: false,
            }),
    });

    return create(storeCreator);
};
