import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

/**
 * SøknadFormValuesContext
 *
 * Tar vare på skjemadata som ikke er submittet. Brukes for å:
 * 1. Gjenopprette skjemaverdier ved browser back/forward
 * 2. Initialisere fra mellomlagret skjemadata ved reload
 */

export type StepFormValues = Record<string, unknown>;

export type SøknadFormValues = Record<string, StepFormValues | undefined>;

interface SøknadFormValuesContextValue {
    søknadFormValues: SøknadFormValues;
    clearSøknadFormValues: () => void;
    setFormValuesForStep: (stepId: string, formValues: StepFormValues) => void;
    clearFormValuesForStep: (stepId: string) => void;
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

    const clearSøknadFormValues = useCallback(() => {
        setValues({});
    }, []);

    const setFormValuesForStep = useCallback((stepId: string, formValues: StepFormValues) => {
        setValues((prev) => ({ ...prev, [stepId]: formValues }));
    }, []);

    const clearFormValuesForStep = useCallback((stepId: string) => {
        setValues((prev) => ({ ...prev, [stepId]: undefined }));
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
