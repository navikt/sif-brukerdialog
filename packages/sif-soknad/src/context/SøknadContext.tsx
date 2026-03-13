import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreApi, UseBoundStore } from 'zustand';

import { checkConsistencyForSteps } from '../consistency/checkConsistencyForSteps';
import { SøknadFormValuesProvider, useSøknadFormValues } from '../consistency/SøknadFormValuesContext';
import { IncludedStep, SøknadFormValues, StepConfig, StepFormValues, StepSøknadsdata } from '../types';
import { getPreviousNextStep } from '../utils';

type FormValuesToSøknadsdataFn = (stepId: string, formValues: StepFormValues) => StepSøknadsdata | undefined;

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

export interface SøknadContextConfig<TSøknadsdata> {
    useStore: UseBoundStore<StoreApi<SøknadStoreState<TSøknadsdata>>>;
    stepConfig: StepConfig<TSøknadsdata>;
    stepOrder: string[];
    stepTitles: Record<string, string>;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
    basePath?: string;
}

export interface SøknadFlowContextValue<TSøknadsdata> {
    // Config
    stepConfig: StepConfig<TSøknadsdata>;
    stepOrder: string[];
    stepTitles: Record<string, string>;
    basePath: string;

    // Store
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

    // Consistency
    checkConsistency: (currentStepId: string) => string | undefined;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
}

interface ProviderProps {
    children: ReactNode;
    initialFormValues?: SøknadFormValues;
}

export function createSøknadContext<TSøknadsdata extends object>(config: SøknadContextConfig<TSøknadsdata>) {
    const SøknadFlowContext = createContext<SøknadFlowContextValue<TSøknadsdata> | null>(null);

    const SøknadFlowContextInner = ({ children }: { children: ReactNode }) => {
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

        // Draft form values for consistency check (owned by SøknadFormValuesContext)
        const { søknadFormValues } = useSøknadFormValues();

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
                if (nextStepId) navigateToStep(nextStepId);
            },
            [getIncludedStepsFresh, navigateToStep],
        );

        const navigateToPreviousStep = useCallback(
            (fromStepId: string) => {
                const { previousStepId } = getPreviousNextStep(getIncludedStepsFresh(), fromStepId);
                if (previousStepId) navigateToStep(previousStepId);
            },
            [getIncludedStepsFresh, navigateToStep],
        );

        const canGoNext = useCallback(
            (fromStepId: string) => getPreviousNextStep(getIncludedStepsFresh(), fromStepId).nextStepId !== null,
            [getIncludedStepsFresh],
        );

        const canGoPrevious = useCallback(
            (fromStepId: string) => getPreviousNextStep(getIncludedStepsFresh(), fromStepId).previousStepId !== null,
            [getIncludedStepsFresh],
        );

        const checkConsistency = useCallback(
            (cStepId: string): string | undefined =>
                checkConsistencyForSteps({
                    currentStepId: cStepId,
                    stepOrder,
                    formValues: søknadFormValues,
                    getSøknadsdataForStep: (stepId) =>
                        søknadState?.søknadsdata[stepId as keyof TSøknadsdata] as StepSøknadsdata | undefined,
                    formValuesToSøknadsdata,
                }),
            [stepOrder, søknadFormValues, søknadState?.søknadsdata, formValuesToSøknadsdata],
        );

        const value = useMemo<SøknadFlowContextValue<TSøknadsdata>>(
            () => ({
                stepConfig,
                stepOrder,
                stepTitles,
                basePath,
                søknadsdata: søknadState?.søknadsdata,
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
                checkConsistency,
                formValuesToSøknadsdata,
            ],
        );

        return <SøknadFlowContext.Provider value={value}>{children}</SøknadFlowContext.Provider>;
    };

    const SøknadContextProvider = ({ children, initialFormValues }: ProviderProps) => (
        <SøknadFormValuesProvider initialValues={initialFormValues}>
            <SøknadFlowContextInner>{children}</SøknadFlowContextInner>
        </SøknadFormValuesProvider>
    );

    const useSøknadFlow = (): SøknadFlowContextValue<TSøknadsdata> => {
        const context = useContext(SøknadFlowContext);
        if (!context) {
            throw new Error('useSøknadFlow må brukes innenfor SøknadContextProvider');
        }
        return context;
    };

    return {
        SøknadContextProvider,
        useSøknadFlow,
    };
}
