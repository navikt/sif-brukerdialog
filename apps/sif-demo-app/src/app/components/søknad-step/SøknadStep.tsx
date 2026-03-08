import { useSøknadFormValues } from '@rammeverk/consistency';
import { useStepNavigation } from '@rammeverk/navigation';
import { StepPage } from '@rammeverk/pages';
import { getProgressSteps } from '@rammeverk/store';

import { søknadStepConfig as stepConfig, SøknadStepId, stepTitles } from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../../hooks/useSøknadMellomlagring';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { useAppIntl } from '../../i18n';
import { getLenker } from '../../lenker';
import { AppConsistencyChecker } from '../../setup/app-consistency-checker/AppConsistencyChecker';
import { Søknadsdata } from '../../types/Søknadsdata';

interface RenderProps<TSkjemadata> {
    defaultValues: Partial<TSkjemadata>;
    onSubmit: (data: TSkjemadata) => Promise<void>;
    isPending: boolean;
    onPrevious: (() => void) | undefined;
}

interface Props<TSkjemadata, TSøknadsdata> {
    stepId: SøknadStepId;
    toSøknadsdata: (data: TSkjemadata) => TSøknadsdata;
    toFormValues?: (søknadsdata: TSøknadsdata | undefined) => Partial<TSkjemadata>;
    children: (props: RenderProps<TSkjemadata>) => React.ReactNode;
}

export function SøknadStep<TSkjemadata, TSøknadsdata>({
    stepId,
    toSøknadsdata,
    toFormValues,
    children,
}: Props<TSkjemadata, TSøknadsdata>) {
    const { text } = useAppIntl();

    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const includedSteps = useSøknadStore((s) => s.includedSteps);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();
    const { clearFormValuesForStep, getFormValuesForStep } = useSøknadFormValues();

    const stepFormValues = getFormValuesForStep<TSkjemadata>(stepId);

    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious, navigateToStep } = useStepNavigation({
        stepConfig,
        getIncludedSteps: () => useSøknadStore.getState().includedSteps,
        setCurrentStep,
    });

    const søknadsdata = søknadState?.søknadsdata[stepId] as TSøknadsdata | undefined;

    const defaultValues: Partial<TSkjemadata> = stepFormValues
        ? stepFormValues
        : toFormValues
          ? toFormValues(søknadsdata)
          : {};

    const onSubmit = async (data: TSkjemadata) => {
        const mapped = toSøknadsdata(data);
        setSøknadsdata({ [stepId]: mapped } as Partial<Søknadsdata>);
        await lagreSøknad();
        clearFormValuesForStep(stepId);
        navigateToNextStep(stepId);
    };

    const onPrevious = canGoPrevious(stepId) ? () => navigateToPreviousStep(stepId) : undefined;

    const fortsettSenere = async () => {
        await lagreSøknad();
        window.location.href = getLenker().minSide;
    };

    return (
        <StepPage
            documentTitle={stepTitles[stepId]}
            applicationTitle={text('application.title')}
            stepId={stepId}
            steps={getProgressSteps(includedSteps, stepTitles)}
            onStepSelect={navigateToStep}
            onAbort={avbrytSøknad}
            onResumeLater={fortsettSenere}>
            <AppConsistencyChecker stepId={stepId} />
            {children({ defaultValues, isPending, onSubmit, onPrevious })}
        </StepPage>
    );
}
