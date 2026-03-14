import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { StoreApi, UseBoundStore } from 'zustand';

import { checkConsistencyForSteps } from '../consistency/checkConsistencyForSteps';
import { SøknadFormValuesProvider, useSøknadFormValues } from '../consistency/SøknadFormValuesContext';
import { useStepNavigation } from '../navigation/useStepNavigation';
import { IncludedStep, SøknadFormValues, StepConfig, StepFormValues, StepSøknadsdata } from '../types';

type FormValuesToSøknadsdataFn<TStepId extends string> = (
    stepId: TStepId,
    formValues: StepFormValues,
) => StepSøknadsdata | undefined;

type GetSøknadsdataForStepFn<TSøknadsdata, TStepId extends string> = (
    stepId: TStepId,
    søknadsdata: TSøknadsdata | undefined,
) => StepSøknadsdata | undefined;

interface SøknadStoreState<TSøknadsdata, TStepId extends string> {
    søknadState: { søknadsdata: TSøknadsdata } | undefined;
    currentStepId?: TStepId;
    includedSteps: Array<IncludedStep<TStepId>>;
    setSøknadsdata: (data: Partial<TSøknadsdata>) => void;
    setCurrentStep: (stepId: TStepId) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: TStepId, harForståttRettigheterOgPlikter: true) => void;
    setSøknadSendt: () => void;
}

export interface SøknadContextConfig<TSøknadsdata, TStepId extends string> {
    useStore: UseBoundStore<StoreApi<SøknadStoreState<TSøknadsdata, TStepId>>>;
    stepConfig: StepConfig<TStepId, TSøknadsdata>;
    stepOrder: TStepId[];
    stepTitles: Record<TStepId, string>;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn<TStepId>;
    getSøknadsdataForStep: GetSøknadsdataForStepFn<TSøknadsdata, TStepId>;
    basePath?: string;
}

export interface SøknadFlowContextValue<TSøknadsdata, TStepId extends string> {
    // Config
    stepConfig: StepConfig<TStepId, TSøknadsdata>;
    stepOrder: TStepId[];
    stepTitles: Record<TStepId, string>;
    basePath: string;

    // Store
    søknadsdata: TSøknadsdata | undefined;
    currentStepId: TStepId | undefined;
    includedSteps: Array<IncludedStep<TStepId>>;
    setSøknadsdata: (data: Partial<TSøknadsdata>) => void;
    resetSøknad: () => void;
    startSøknad: (firstStepId: TStepId, harForståttRettigheterOgPlikter: true) => void;
    setSøknadSendt: () => void;

    // Navigasjon
    navigateToStep: (stepId: TStepId) => void;
    navigateToNextStep: (fromStepId: TStepId) => void;
    navigateToPreviousStep: (fromStepId: TStepId) => void;
    canGoNext: (fromStepId: TStepId) => boolean;
    canGoPrevious: (fromStepId: TStepId) => boolean;

    // Consistency
    checkConsistency: (currentStepId: TStepId) => TStepId | undefined;
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn<TStepId>;

    // Submit
    commitStep: (stepId: TStepId, data: Partial<TSøknadsdata>) => void;
}

interface ProviderProps {
    children: ReactNode;
    initialFormValues?: SøknadFormValues;
}

export function createSøknadContext<TSøknadsdata extends object, TStepId extends string>(
    config: SøknadContextConfig<TSøknadsdata, TStepId>,
) {
    const SøknadFlowContext = createContext<SøknadFlowContextValue<TSøknadsdata, TStepId> | null>(null);

    const SøknadFlowContextInner = ({ children }: { children: ReactNode }) => {
        const {
            useStore,
            stepConfig,
            stepOrder,
            stepTitles,
            formValuesToSøknadsdata,
            getSøknadsdataForStep,
            basePath = '/soknad',
        } = config;

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
        const { søknadFormValues, clearFormValuesForStep, markSkipNextUnmountSaveForStep } = useSøknadFormValues();

        const getSøknadSteps = useCallback(() => useStore.getState().includedSteps, [useStore]);

        const { navigateToStep, navigateToNextStep, navigateToPreviousStep, canGoNext, canGoPrevious } =
            useStepNavigation<TStepId, TSøknadsdata>({
                stepConfig,
                getSøknadSteps,
                setCurrentStep,
                basePath,
            });

        const commitStep = useCallback(
            (stepId: TStepId, data: Partial<TSøknadsdata>) => {
                markSkipNextUnmountSaveForStep(stepId);
                setSøknadsdata(data);
                clearFormValuesForStep(stepId);
            },
            [markSkipNextUnmountSaveForStep, setSøknadsdata, clearFormValuesForStep],
        );

        const checkConsistency = useCallback(
            (cStepId: TStepId): TStepId | undefined =>
                checkConsistencyForSteps({
                    currentStepId: cStepId,
                    stepOrder,
                    formValues: søknadFormValues,
                    getSøknadsdataForStep: (stepId: TStepId) => getSøknadsdataForStep(stepId, søknadState?.søknadsdata),
                    formValuesToSøknadsdata,
                }),
            [stepOrder, søknadFormValues, søknadState?.søknadsdata, getSøknadsdataForStep, formValuesToSøknadsdata],
        );

        const value = useMemo<SøknadFlowContextValue<TSøknadsdata, TStepId>>(
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
                commitStep,
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
                commitStep,
            ],
        );

        return <SøknadFlowContext.Provider value={value}>{children}</SøknadFlowContext.Provider>;
    };

    const SøknadContextProvider = ({ children, initialFormValues }: ProviderProps) => (
        <SøknadFormValuesProvider initialValues={initialFormValues}>
            <SøknadFlowContextInner>{children}</SøknadFlowContextInner>
        </SøknadFormValuesProvider>
    );

    const useSøknadFlow = (): SøknadFlowContextValue<TSøknadsdata, TStepId> => {
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
