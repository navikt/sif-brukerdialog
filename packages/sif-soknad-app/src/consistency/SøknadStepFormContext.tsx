import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

export type StepFormValues = Record<string, unknown>;
export type StepFormValuesMap = Record<string, StepFormValues>;

/**
 * Skjemaverdier for RHF-steg håndteres i to lag her:
 *
 * 1. `draftFormValues` (React state) — lagres ved unmount (browser back/forward).
 *    Holder verdier for steg som IKKE er montert. Brukes av konsistenssjekken
 *    og som kilde for blob-lagring av umonterte steg.
 *
 * 2. `liveGettersRef` (ref) — registrerte getters for steg som ER montert.
 *    Unngår re-renders ved å bruke ref i stedet for state.
 *    Brukes av useMellomlagring for å lese verdier mens bruker fyller ut.
 *
 * De to lagene er gjensidig utelukkende per stepId:
 * - Montert steg: finnes i liveGettersRef, IKKE i draftFormValues
 * - Umontert steg: finnes i draftFormValues, IKKE i liveGettersRef
 *
 * Et tredje lag (persistedFormValues i Zustand) persisteres til/fra mellomlagring-blob.
 * Se useStepData og useMellomlagring for hvordan de tre lagene samspiller.
 */
interface SøknadStepFormContextValue {
    // --- Lag 1: unmount-lagrede verdier (konsistenssjekk + kilde for blob) ---
    draftFormValues: StepFormValuesMap;
    setFormValuesForStep: (stepId: string, formValues: StepFormValues) => void;
    clearFormValuesForStep: (stepId: string) => void;
    /** Marker at unmount-handleren for dette steget skal hoppes over (settes av useStepData.commit). */
    markSkipNextUnmountSaveForStep: (stepId: string) => void;
    /** Returnerer true hvis steget skal lagre ved unmount — og konsumerer markeringen. */
    shouldSaveOnUnmountForStep: (stepId: string) => boolean;

    // --- Lag 2: live getters for monterte steg ---
    registerGetValuesForStep: (stepId: string, getValues: () => StepFormValues) => void;
    unregisterGetValuesForStep: (stepId: string) => void;
    /** Returnerer gjeldende verdier fra alle monterte steg — for bruk i useMellomlagring. */
    getAllLiveFormValues: () => Record<string, StepFormValues>;
}

const SøknadStepFormContext = createContext<SøknadStepFormContextValue | null>(null);

/**
 * Provider som holder in-session skjemaverdier per steg (lag 1 + 2 av tre draft-lag).
 * Monteres av SøknadRouter og wrapper hele søknadsflyten.
 */
export const SøknadStepFormProvider = ({ children }: { children: ReactNode }) => {
    const [values, setValues] = useState<StepFormValuesMap>({});
    const skipNextUnmountSaveRef = useRef<Set<string>>(new Set());
    const liveGettersRef = useRef<Map<string, () => StepFormValues>>(new Map());

    const setFormValuesForStep = useCallback((stepId: string, formValues: StepFormValues) => {
        setValues((prev) => ({ ...prev, [stepId]: formValues }));
    }, []);

    const clearFormValuesForStep = useCallback((stepId: string) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setValues(({ [stepId]: _, ...rest }) => rest);
    }, []);

    const markSkipNextUnmountSaveForStep = useCallback((stepId: string) => {
        skipNextUnmountSaveRef.current.add(stepId);
    }, []);

    const shouldSaveOnUnmountForStep = useCallback((stepId: string): boolean => {
        if (!skipNextUnmountSaveRef.current.has(stepId)) {
            return true;
        }
        skipNextUnmountSaveRef.current.delete(stepId);
        return false;
    }, []);

    const registerGetValuesForStep = useCallback((stepId: string, getValues: () => StepFormValues) => {
        liveGettersRef.current.set(stepId, getValues);
    }, []);

    const unregisterGetValuesForStep = useCallback((stepId: string) => {
        liveGettersRef.current.delete(stepId);
    }, []);

    const getAllLiveFormValues = useCallback((): Record<string, StepFormValues> => {
        const result: Record<string, StepFormValues> = {};
        liveGettersRef.current.forEach((getter, stepId) => {
            result[stepId] = getter();
        });
        return result;
    }, []);

    return (
        <SøknadStepFormContext.Provider
            value={{
                draftFormValues: values,
                setFormValuesForStep,
                clearFormValuesForStep,
                markSkipNextUnmountSaveForStep,
                shouldSaveOnUnmountForStep,
                registerGetValuesForStep,
                unregisterGetValuesForStep,
                getAllLiveFormValues,
            }}>
            {children}
        </SøknadStepFormContext.Provider>
    );
};

export const useSøknadStepFormContext = (): SøknadStepFormContextValue => {
    const context = useContext(SøknadStepFormContext);
    if (!context) {
        throw new Error('useSøknadStepFormContext må brukes innenfor SøknadStepFormProvider');
    }
    return context;
};
