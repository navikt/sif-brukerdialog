import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

export type StepFormValues = Record<string, unknown>;
export type SøknadFormValues = Record<string, StepFormValues>;

interface SøknadFormValuesContextValue {
    søknadFormValues: SøknadFormValues;
    setFormValuesForStep: (stepId: string, formValues: StepFormValues) => void;
    clearFormValuesForStep: (stepId: string) => void;
    markSkipNextUnmountSaveForStep: (stepId: string) => void;
    shouldSaveOnUnmountForStep: (stepId: string) => boolean;
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

    return (
        <SøknadFormValuesContext.Provider
            value={{
                søknadFormValues: values,
                setFormValuesForStep,
                clearFormValuesForStep,
                markSkipNextUnmountSaveForStep,
                shouldSaveOnUnmountForStep,
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
