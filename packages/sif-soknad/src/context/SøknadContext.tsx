import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreApi, UseBoundStore } from 'zustand';

import { IncludedStep, SøknadFormValues, StepConfig, StepFormValues, StepSøknadsdata } from '../types';

/**
 * Konverter-funksjon fra skjemadata til søknadsdata for et steg.
 * Brukes av consistency-sjekk.
 */
type FormValuesToSøknadsdataFn = (stepId: string, formValues: StepFormValues) => StepSøknadsdata | undefined;

/**
 * Store-interface som SøknadContext forventer.
 */
interface SøknadStoreState<TSøknadsdata> {
    søknadState: { søknadsdata: TSøknadsdata } | undefined;
    currentStepId?: string;
    includedSteps: IncludedStep[];
    setSøknadsdata: (data: Partial<TSøknadsdata>) => void;
    setCurrentStep: (stepId: string) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: string, harForståttRettigheterOgPlikter: true) => void;
    setSøknadSendt: () => void;
}

/**
 * Konfigurasjon for å opprette SøknadContext.
 */
export interface SøknadContextConfig<TSøknadsdata> {
    /** Zustand store hook */
    useStore: UseBoundStore<StoreApi<SøknadStoreState<TSøknadsdata>>>;
    /** Steg-konfigurasjon med routes, isCompleted, isIncluded */
    stepConfig: StepConfig<TSøknadsdata>;
    /** Rekkefølge på steg */
    stepOrder: string[];
    /** Titler for steg (brukes i progress-indikator) */
    stepTitles: Record<string, string>;
    /** Konverter skjemadata til søknadsdata per steg (for consistency-sjekk) */
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
    /** Base path for søknad-routes */
    basePath?: string;
}

/**
 * Verdier som er tilgjengelige via useSøknadContext.
 */
interface SøknadContextValue<TSøknadsdata> {
    // Config
    stepConfig: StepConfig<TSøknadsdata>;
    stepOrder: string[];
    stepTitles: Record<string, string>;
    basePath: string;

    // Store-verdier
    søknadsdata: TSøknadsdata | undefined;
    currentStepId: string | undefined;
    includedSteps: IncludedStep[];
    setSøknadsdata: (data: Partial<TSøknadsdata>) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: string, harForståttRettigheterOgPlikter: true) => void;
    setSøknadSendt: () => void;

    // Navigasjon
    navigateToStep: (stepId: string) => void;
    navigateToNextStep: (fromStepId: string) => void;
    navigateToPreviousStep: (fromStepId: string) => void;
    canGoNext: (fromStepId: string) => boolean;
    canGoPrevious: (fromStepId: string) => boolean;

    // Skjemaverdier (usubmittede)
    formValues: SøknadFormValues;
    getFormValuesForStep: <T = StepFormValues>(stepId: string) => Partial<T> | undefined;
    setFormValuesForStep: (stepId: string, values: StepFormValues) => void;
    clearFormValuesForStep: (stepId: string) => void;
    clearAllFormValues: () => void;

    // Consistency
    checkConsistency: (currentStepId: string) => string | undefined;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
}

const getPreviousNextStep = (includedSteps: IncludedStep[], currentStepId: string | null) => {
    const includedStepIds = includedSteps.map((s) => s.stepId);
    const currentIndex = currentStepId ? includedStepIds.indexOf(currentStepId) : -1;
    return {
        previousStepId: currentIndex > 0 ? includedStepIds[currentIndex - 1] : null,
        nextStepId: currentIndex < includedStepIds.length - 1 ? includedStepIds[currentIndex + 1] : null,
    };
};

interface ProviderProps {
    children: ReactNode;
    initialFormValues?: SøknadFormValues;
}

/**
 * Oppretter SøknadContext med Provider og hooks.
 * Samler navigasjon, skjemaverdier og consistency-sjekk i én kontekst.
 */
export function createSøknadContext<TSøknadsdata extends object>(config: SøknadContextConfig<TSøknadsdata>) {
    const SøknadContext = createContext<SøknadContextValue<TSøknadsdata> | null>(null);

    const SøknadContextProvider = ({ children, initialFormValues }: ProviderProps) => {
        const navigate = useNavigate();
        const { useStore, stepConfig, stepOrder, stepTitles, formValuesToSøknadsdata, basePath = '/soknad' } = config;

        // Store
        const søknadState = useStore((s) => s.søknadState);
        const currentStepId = useStore((s) => s.currentStepId);
        const includedSteps = useStore((s) => s.includedSteps);
        const setSøknadsdata = useStore((s) => s.setSøknadsdata);
        const setCurrentStep = useStore((s) => s.setCurrentStep);
        const resetSøknad = useStore((s) => s.resetSøknad);
        const startSøknad = useStore((s) => s.startSøknad);
        const setSøknadSendt = useStore((s) => s.setSøknadSendt);

        // Skjemaverdier (usubmittede)
        const [formValues, setFormValues] = useState<SøknadFormValues>(initialFormValues ?? {});

        const getFormValuesForStep = useCallback(
            <T = StepFormValues,>(stepId: string): Partial<T> | undefined => {
                return formValues[stepId] as Partial<T> | undefined;
            },
            [formValues],
        );

        const setFormValuesForStep = useCallback((stepId: string, values: StepFormValues) => {
            setFormValues((prev) => ({ ...prev, [stepId]: values }));
        }, []);

        const clearFormValuesForStep = useCallback((stepId: string) => {
            setFormValues((prev) => ({ ...prev, [stepId]: undefined }));
        }, []);

        const clearAllFormValues = useCallback(() => {
            setFormValues({});
        }, []);

        // Navigasjon
        const navigateToStep = useCallback(
            (stepId: string) => {
                setCurrentStep(stepId);
                const route = stepConfig[stepId]?.route;
                if (route) {
                    navigate(`${basePath}/${route}`);
                }
            },
            [setCurrentStep, navigate, basePath, stepConfig],
        );

        const getIncludedStepsFresh = useCallback(() => {
            return useStore.getState().includedSteps;
        }, [useStore]);

        const navigateToNextStep = useCallback(
            (fromStepId: string) => {
                const { nextStepId } = getPreviousNextStep(getIncludedStepsFresh(), fromStepId);
                if (nextStepId) {
                    navigateToStep(nextStepId);
                }
            },
            [getIncludedStepsFresh, navigateToStep],
        );

        const navigateToPreviousStep = useCallback(
            (fromStepId: string) => {
                const { previousStepId } = getPreviousNextStep(getIncludedStepsFresh(), fromStepId);
                if (previousStepId) {
                    navigateToStep(previousStepId);
                }
            },
            [getIncludedStepsFresh, navigateToStep],
        );

        const canGoNext = useCallback(
            (fromStepId: string) => {
                const { nextStepId } = getPreviousNextStep(getIncludedStepsFresh(), fromStepId);
                return nextStepId !== null;
            },
            [getIncludedStepsFresh],
        );

        const canGoPrevious = useCallback(
            (fromStepId: string) => {
                const { previousStepId } = getPreviousNextStep(getIncludedStepsFresh(), fromStepId);
                return previousStepId !== null;
            },
            [getIncludedStepsFresh],
        );

        // Consistency-sjekk
        const checkConsistency = useCallback(
            (cStepId: string): string | undefined => {
                const currentIndex = stepOrder.indexOf(cStepId);
                if (currentIndex <= 0) return undefined;

                const precedingSteps = stepOrder.slice(0, currentIndex);

                for (const stepId of precedingSteps) {
                    const stepFormValues = formValues[stepId];
                    if (!stepFormValues) continue;

                    const stepSøknadsdata = søknadState?.søknadsdata[stepId as keyof TSøknadsdata];
                    const converted = formValuesToSøknadsdata(stepId, stepFormValues);

                    if (!stepSøknadsdata || JSON.stringify(converted) !== JSON.stringify(stepSøknadsdata)) {
                        return stepId;
                    }
                }
                return undefined;
            },
            [stepOrder, formValues, søknadState?.søknadsdata, formValuesToSøknadsdata],
        );

        const value = useMemo<SøknadContextValue<TSøknadsdata>>(
            () => ({
                // Config
                stepConfig,
                stepOrder,
                stepTitles,
                basePath,

                // Store
                søknadsdata: søknadState?.søknadsdata,
                currentStepId,
                includedSteps,
                setSøknadsdata,
                resetSøknad,
                startSøknad,
                setSøknadSendt,

                // Navigasjon
                navigateToStep,
                navigateToNextStep,
                navigateToPreviousStep,
                canGoNext,
                canGoPrevious,

                // Skjemaverdier
                formValues,
                getFormValuesForStep,
                setFormValuesForStep,
                clearFormValuesForStep,
                clearAllFormValues,

                // Consistency
                checkConsistency,
                formValuesToSøknadsdata,
            }),
            [
                stepConfig,
                stepOrder,
                stepTitles,
                basePath,
                søknadState?.søknadsdata,
                currentStepId,
                includedSteps,
                setSøknadsdata,
                resetSøknad,
                startSøknad,
                setSøknadSendt,
                navigateToStep,
                navigateToNextStep,
                navigateToPreviousStep,
                canGoNext,
                canGoPrevious,
                formValues,
                getFormValuesForStep,
                setFormValuesForStep,
                clearFormValuesForStep,
                clearAllFormValues,
                checkConsistency,
                formValuesToSøknadsdata,
            ],
        );

        return <SøknadContext.Provider value={value}>{children}</SøknadContext.Provider>;
    };

    /**
     * Hook for å hente hele søknadskonteksten.
     */
    const useSøknadContext = (): SøknadContextValue<TSøknadsdata> => {
        const context = useContext(SøknadContext);
        if (!context) {
            throw new Error('useSøknadContext må brukes innenfor SøknadContextProvider');
        }
        return context;
    };

    return {
        SøknadContextProvider,
        useSøknadContext,
    };
}
