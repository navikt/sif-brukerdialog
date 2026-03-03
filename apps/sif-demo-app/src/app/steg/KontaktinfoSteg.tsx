import { Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

import { SøknadFooter } from '@rammeverk/components';
import { useStepNavigation } from '@rammeverk/state';

import { useFormSubmitGuard } from '../components/FormSubmitGuard';
import { SøknadStepId, søknadStepConfig as stepConfig, søknadStepOrder as stepOrder } from '../config/søknadStepConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useSøknadStepStatus } from '../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';

interface Skjemadata {
    epost: string;
}

export const KontaktinfoSteg = () => {
    const stegId = SøknadStepId.KONTAKT;

    const appState = useSøknadStore((s) => s.søknadState);
    const submitSteg = useSøknadStore((s) => s.submitStep);
    const setCurrentStepId = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();

    const stepStatus = useSøknadStepStatus();
    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep: setCurrentStepId,
    });

    const { register, handleSubmit, getValues } = useForm<Skjemadata>({
        defaultValues: {
            epost: appState?.søknadsdata[stegId]?.epost ?? '',
        },
    });

    const { FormSubmitGuardInfo, clearFormValues } = useFormSubmitGuard({
        stepId: stegId,
        getValues: () => getValues(),
    });

    const onSubmit = (data: Skjemadata) => {
        submitSteg(
            { [stegId]: { epost: data.epost } },
            {
                onSuccess: () => {
                    clearFormValues();
                    navigateToNextStep(stegId);
                },
            },
        );
    };

    return (
        <VStack gap="space-24">
            <FormSubmitGuardInfo />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16">
                    <Heading size="large">Kontaktinfo</Heading>
                    <TextField label="E-post" type="email" {...register('epost')} />
                    <HStack gap="space-16" justify="start">
                        {canGoPrevious(stegId) && (
                            <Button type="button" variant="secondary" onClick={() => navigateToPreviousStep(stegId)}>
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
