import { Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

import { SøknadFooter } from '@rammeverk/components';
import { useStepNavigation } from '@rammeverk/state';

import { useFormSubmitGuard } from '../components/FormSubmitGuard';
import { søknadStepOrder as stepOrder, søknadStepConfig as stepConfig, SøknadStepId } from '../config/søknadStepConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useSøknadStepStatus } from '../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

interface Skjemadata {
    navn: string;
}

export const KjæledyrSteg = () => {
    const stepId = SøknadStepId.KJÆLEDYR;

    const søknadState = useSøknadStore((s) => s.søknadState);
    const submitStep = useSøknadStore((s) => s.submitStep);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();

    const stepStatus = useSøknadStepStatus();
    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep,
    });

    const { register, handleSubmit, getValues } = useForm<Skjemadata>({
        defaultValues: {
            navn: søknadState?.søknadsdata[stepId]?.navn ?? '',
        },
    });

    const { FormSubmitGuardInfo, clearFormValues } = useFormSubmitGuard({ stepId, getValues: () => getValues() });

    const onSubmit = (data: Skjemadata) => {
        if (!data.navn) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        submitStep(
            { [stepId]: { navn: data.navn } },
            {
                onSuccess: () => {
                    clearFormValues();
                    navigateToNextStep(stepId);
                },
            },
        );
    };

    return (
        <VStack gap="space-24">
            <FormSubmitGuardInfo />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16">
                    <Heading size="large">Navn på kjæledyr</Heading>
                    <TextField label="Navn" {...register('navn')} />

                    <HStack gap="space-16" justify="start">
                        {canGoPrevious(stepId) && (
                            <Button type="button" variant="secondary" onClick={() => navigateToPreviousStep(stepId)}>
                                Forrige
                            </Button>
                        )}
                        <Button type="submit">Neste</Button>
                    </HStack>
                </VStack>
            </form>
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
