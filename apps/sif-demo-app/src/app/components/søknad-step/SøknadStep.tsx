import { Box, Heading } from '@navikt/ds-react';
import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { søknadStepConfig as stepConfig, SøknadStepId, stepTitles } from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../../hooks/useSøknadMellomlagring';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { AppStepConsistencyChecker } from '../../setup/app-step-consistency-checker/AppStepConsistencyChecker';
import { Søknadsdata } from '../../types/Søknadsdata';
import { DefaultPage } from '../default-page/DefaultPage';

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
    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const includedSteps = useSøknadStore((s) => s.includedSteps);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();
    const { clearAllStepFormValues, getStepFormValues } = useStepFormValues();

    const stepFormValues = getStepFormValues<TSkjemadata>(stepId);

    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
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
        <DefaultPage documentTitle={stepTitles[stepId]}>
            <AppStepConsistencyChecker stepId={stepId} />
            <Heading level="1" size="large">
                {stepTitles[stepId]}
            </Heading>
            {includedSteps.map((s) => s.stepId)}
            <Box>{children({ defaultValues, onSubmit, isPending, onPrevious })}</Box>
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </DefaultPage>
    );
}
