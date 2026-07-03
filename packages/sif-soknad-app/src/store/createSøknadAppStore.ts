import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

import { IncludedStep, MellomlagringBlob, StepDefinition } from '../types';
import { getIncludedSteps } from '../utils/stepUtils';

export interface SøknadStoreState {
    /** Committet søknadsdata per steg — oppdateres kun ved submit. Domeneverdier, ikke rå skjemaverdier. */
    søknadsdata: Record<string, unknown>;
    /**
     * Persisterte RHF-skjemaverdier per steg — lagres til/leses fra mellomlagring-blob.
     * Brukes som `defaultValues` etter reload slik at brukeren ikke mister utfylte verdier.
     * Nøkkel: stepId. Ryddes for et steg ved commit eller reset.
     */
    persistedFormValues: Record<string, Record<string, unknown>>;
    /**
     * Gjenopptakingspunkt — steget brukeren skal landes på ved reload.
     * Settes til neste steg etter siste commit, IKKE nødvendigvis det steget brukeren ser på nå
     * (React Router styrer navigasjon uavhengig av denne verdien).
     */
    resumeStepId: string | undefined;
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
     * Returnerer nytt resumeStepId og route slik at kallet etter kan håndtere
     * mellomlagring-PUT og navigering (trinn 7–8).
     */
    commitState: (
        stepId: string,
        data: unknown,
    ) => { newResumeStepId: string | undefined; newRoute: string | undefined };
    /** Rydder persisterte verdier for ett steg (etter commit eller ved reset). */
    clearPersistedFormValues: (stepId: string) => void;
    /** Oppdaterer hele persistedFormValues-mappet i storen (etter manuell lagre()). */
    setPersistedFormValues: (values: Record<string, Record<string, unknown>>) => void;
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
        persistedFormValues: {},
        resumeStepId: undefined,
        includedSteps: [],
        søknadSendt: false,
        isInitialized: false,

        init: (mellomlagring) => {
            if (!mellomlagring) {
                set({
                    søknadsdata: {},
                    persistedFormValues: {},
                    resumeStepId: undefined,
                    includedSteps: computeIncludedSteps(stepOrder, config, {}),
                    søknadSendt: false,
                    isInitialized: true,
                });
                return;
            }

            const { søknadsdata, resumeStepId, persistedFormValues } = mellomlagring;
            set({
                søknadsdata,
                persistedFormValues: persistedFormValues ?? {},
                resumeStepId,
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

            // Trinn 6: resumeStepId = neste steg etter dette i sekvensen
            const newResumeStepId = findNextStepAfterCommit(nyeIncludedSteps, stepId);
            const newRoute = newResumeStepId ? config[newResumeStepId]?.route : undefined;

            set({
                søknadsdata: oppdatertSøknadsdata,
                includedSteps: nyeIncludedSteps,
                resumeStepId: newResumeStepId,
            });

            return { newResumeStepId, newRoute };
        },

        clearPersistedFormValues: (stepId) =>
            set((state) => {
                const updated = { ...state.persistedFormValues };
                delete updated[stepId];
                return { persistedFormValues: updated };
            }),

        setPersistedFormValues: (values) => set({ persistedFormValues: values }),

        setSøknadSendt: () =>
            set({
                søknadSendt: true,
                resumeStepId: undefined,
                persistedFormValues: {},
            }),

        reset: () =>
            set({
                søknadsdata: {},
                persistedFormValues: {},
                resumeStepId: undefined,
                includedSteps: computeIncludedSteps(stepOrder, config, {}),
                søknadSendt: false,
                isInitialized: true,
            }),
    });

    return create(storeCreator);
};
