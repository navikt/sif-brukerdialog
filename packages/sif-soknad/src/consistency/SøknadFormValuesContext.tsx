import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

import { SøknadFormValues, StepFormValues } from '../types';

/**
 * SøknadFormValuesContext
 *
 * Tar vare på skjemadata som ikke er submittet. Brukes for å:
 * 1. Gjenopprette skjemaverdier ved browser back/forward
 * 2. Initialisere fra mellomlagret skjemadata ved reload
 */

interface SøknadFormValuesContextValue {
    søknadFormValues: SøknadFormValues;
    clearSøknadFormValues: () => void;
    setFormValuesForStep: (stepId: string, formValues: StepFormValues) => void;
    clearFormValuesForStep: (stepId: string) => void;
    markSkipNextUnmountSaveForStep: (stepId: string) => void;
    shouldSaveOnUnmountForStep: (stepId: string) => boolean;
    getFormValuesForStep: <T = StepFormValues>(stepId: string) => Partial<T> | undefined;
}

const SøknadFormValuesContext = createContext<SøknadFormValuesContextValue | null>(null);

interface Props {
    children: ReactNode;
    initialValues?: SøknadFormValues;
}

/**
 * SøknadFormValuesProvider
 * Provider for SøknadFormValuesContext. Skal wrappe hele søknadsflyten for å sikre at
 * skjemadata bevares ved back/forward navigering i nettleser og reload.
 */
export const SøknadFormValuesProvider = ({ children, initialValues }: Props) => {
    const [values, setValues] = useState<SøknadFormValues>((initialValues as SøknadFormValues) ?? {});
    const skipNextUnmountSaveRef = useRef<Set<string>>(new Set());

    const clearSøknadFormValues = useCallback(() => {
        setValues({});
        skipNextUnmountSaveRef.current.clear();
    }, []);

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

    const getFormValuesForStep = useCallback(
        <T = StepFormValues,>(stepId: string): Partial<T> | undefined => {
            return values[stepId] as Partial<T> | undefined;
        },
        [values],
    );

    return (
        <SøknadFormValuesContext.Provider
            value={{
                søknadFormValues: values,
                clearSøknadFormValues,
                setFormValuesForStep,
                clearFormValuesForStep,
                markSkipNextUnmountSaveForStep,
                shouldSaveOnUnmountForStep,
                getFormValuesForStep,
            }}>
            {children}
        </SøknadFormValuesContext.Provider>
    );
};

export const useSøknadFormValues = (): SøknadFormValuesContextValue => {
    const context = useContext(SøknadFormValuesContext);
    if (!context) {
        throw new Error('useSøknadFormValues must be used within SøknadFormValuesProvider');
    }
    return context;
};

export const useSøknadFormDraft = useSøknadFormValues;
