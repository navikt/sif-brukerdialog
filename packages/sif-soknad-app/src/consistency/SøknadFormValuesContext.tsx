import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

export type StepFormValues = Record<string, unknown>;
export type SøknadFormValues = Record<string, StepFormValues>;

interface SøknadFormValuesContextValue {
    // --- Konsistenssjekk (browser back/forward) ---
    /** Unmount-lagrede RHF-verdier per steg. Oppdateres når bruker navigerer bort uten å submitte. */
    søknadFormValues: SøknadFormValues;
    setFormValuesForStep: (stepId: string, formValues: StepFormValues) => void;
    clearFormValuesForStep: (stepId: string) => void;
    /** Marker at unmount-handleren for dette steget skal hoppes over (settes av useStepData.commit). */
    markSkipNextUnmountSaveForStep: (stepId: string) => void;
    /** Returnerer true hvis steget skal lagre ved unmount — og konsumerer markering. */
    shouldSaveOnUnmountForStep: (stepId: string) => boolean;

    // --- Live getters (manuell mellomlagring) ---
    /**
     * Registrer en live getter for et steg — kalles av useSaveSøknadFormValues ved mount.
     * Gjør det mulig for useMellomlagring å hente gjeldende skjemaverdier mens steget er montert.
     */
    registerGetValuesForStep: (stepId: string, getValues: () => StepFormValues) => void;
    unregisterGetValuesForStep: (stepId: string) => void;
    /** Returnerer nåværende (live) skjemaverdier for et steg, hvis steget er montert. */
    getLiveFormValuesForStep: (stepId: string) => StepFormValues | undefined;
}

const SøknadFormValuesContext = createContext<SøknadFormValuesContextValue | null>(null);

/**
 * Provider som holder "draft" RHF-skjemaverdier per steg.
 * Brukes for å fange opp endringer bruker gjør uten å submitte (browser back/forward).
 * Skal wrap hele søknadsflyten — monteres av SøknadRouter.
 */
export const SøknadFormValuesProvider = ({ children }: { children: ReactNode }) => {
    const [values, setValues] = useState<SøknadFormValues>({});
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

    const getLiveFormValuesForStep = useCallback((stepId: string): StepFormValues | undefined => {
        return liveGettersRef.current.get(stepId)?.();
    }, []);

    return (
        <SøknadFormValuesContext.Provider
            value={{
                søknadFormValues: values,
                setFormValuesForStep,
                clearFormValuesForStep,
                markSkipNextUnmountSaveForStep,
                shouldSaveOnUnmountForStep,
                registerGetValuesForStep,
                unregisterGetValuesForStep,
                getLiveFormValuesForStep,
            }}>
            {children}
        </SøknadFormValuesContext.Provider>
    );
};

export const useSøknadFormValues = (): SøknadFormValuesContextValue => {
    const context = useContext(SøknadFormValuesContext);
    if (!context) {
        throw new Error('useSøknadFormValues må brukes innenfor SøknadFormValuesProvider');
    }
    return context;
};
