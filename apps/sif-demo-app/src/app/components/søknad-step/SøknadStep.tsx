import { ProgressStep } from '@navikt/sif-common-ui/';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { IncludedStep } from '../../../rammeverk';
import { SøknadStepPage } from '../../../rammeverk/components/søknad-step-page/SøknadStepPage';
import { søknadStepConfig as stepConfig, SøknadStepId, stepTitles } from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../../hooks/useSøknadMellomlagring';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { useAppIntl } from '../../i18n';
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

const getProgressSteps = (includedSteps: IncludedStep[]): ProgressStep[] => {
    return includedSteps.map((s, index) => ({
        id: s.stepId,
        index,
        label: stepTitles[s.stepId],
        completed: s.completed,
    }));
};

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
    const { clearAllStepFormValues, getStepFormValues } = useStepFormValues();

    const stepFormValues = getStepFormValues<TSkjemadata>(stepId);

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
        clearAllStepFormValues();
        navigateToNextStep(stepId);
    };

    const onPrevious = canGoPrevious(stepId) ? () => navigateToPreviousStep(stepId) : undefined;

    return (
        <SøknadStepPage
            documentTitle={stepTitles[stepId]}
            applicationTitle={text('application.title')}
            stepId={stepId}
            steps={getProgressSteps(includedSteps)}
            onStepSelect={navigateToStep}
            onAbort={avbrytSøknad}>
            {children({ defaultValues, isPending, onSubmit, onPrevious })}
        </SøknadStepPage>
    );
}
