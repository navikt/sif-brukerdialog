import { Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { useFormSubmitGuard } from '../../components/FormSubmitGuard';
import {
    SøknadStepId,
    søknadStepConfig as stepConfig,
    søknadStepOrder as stepOrder,
} from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadStepStatus } from '../../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { KontaktSøknadsdata } from '../../types/Søknadsdata';

interface Skjemadata {
    epost: string;
}

const getDefaultValues = (
    stepFormValues: Partial<Skjemadata> | undefined,
    søknadsdata?: KontaktSøknadsdata,
): Partial<Skjemadata> => {
    if (stepFormValues) {
        return stepFormValues;
    }
    if (søknadsdata) {
        return {
            epost: søknadsdata.epost,
        };
    }
    return {};
};

export const KontaktinfoSteg = () => {
    const stepId = SøknadStepId.KONTAKT;

    const søknadState = useSøknadStore((s) => s.søknadState);
    const submitSteg = useSøknadStore((s) => s.submitStep);
    const setCurrentStepId = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();

    const formValues = useStepFormValues().getStepFormValues(stepId);

    const stepStatus = useSøknadStepStatus();
    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep: setCurrentStepId,
    });

    const { register, handleSubmit, getValues } = useForm<Skjemadata>({
        defaultValues: getDefaultValues(formValues, søknadState?.søknadsdata[stepId]),
    });

    const { FormSubmitGuardInfo, clearFormValues } = useFormSubmitGuard({
        stepId: stepId,
        getValues: () => getValues(),
    });

    const onSubmit = (data: Skjemadata) => {
        submitSteg(
            { [stepId]: { epost: data.epost } },
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
                    <Heading size="large">Kontaktinfo</Heading>
                    <TextField label="E-post" type="email" {...register('epost')} />
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
