import { Box, Heading, VStack } from '@navikt/ds-react';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';
import { SøknadFooter } from '@rammeverk/components';

import {
    stepTitles,
    SøknadStepId,
    søknadStepConfig as stepConfig,
    søknadStepOrder as stepOrder,
} from '../config/søknadStepConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../hooks/useSøknadMellomlagring';
import { useSøknadStepStatus } from '../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';
import { Søknadsdata } from '../types/Søknadsdata';
import { SøknadStepGuard } from './SøknadStepGuard';

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

function SøknadStep<TSkjemadata, TSøknadsdata>({
    stepId,
    toSøknadsdata,
    toFormValues,
    children,
}: Props<TSkjemadata, TSøknadsdata>) {
    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();
    const { clearAllSteps, getStepFormValues } = useStepFormValues();

    const stepFormValues = getStepFormValues<TSkjemadata>(stepId);
    const stepStatus = useSøknadStepStatus();

    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
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
        clearAllSteps();
        navigateToNextStep(stepId);
    };

    const onPrevious = canGoPrevious(stepId) ? () => navigateToPreviousStep(stepId) : undefined;

    return (
        <VStack gap="space-24">
            <SøknadStepGuard stepId={stepId} />
            <Heading level="1" size="large">
                {stepTitles[stepId]}
            </Heading>
            <Box>{children({ defaultValues, onSubmit, isPending, onPrevious })}</Box>
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
}

export default SøknadStep;
