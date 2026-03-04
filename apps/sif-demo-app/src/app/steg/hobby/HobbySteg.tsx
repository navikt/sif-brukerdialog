import { Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { useFormSubmitGuard } from '../../hooks/useFormSubmitGuard';
import {
    søknadStepOrder as stepOrder,
    søknadStepConfig as stepConfig,
    SøknadStepId,
} from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadStepStatus } from '../../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { HobbySøknadsdata } from '../../types/Søknadsdata';
import { useSøknadMellomlagring } from '../../hooks';

interface Skjemadata {
    navn: string;
}

const getDefaultValues = (
    stepFormValues: Partial<Skjemadata> | undefined,
    søknadsdata?: HobbySøknadsdata,
): Partial<Skjemadata> => {
    if (stepFormValues) {
        return stepFormValues;
    }
    if (søknadsdata) {
        return {
            navn: søknadsdata.navn,
        };
    }
    return {};
};

export const HobbySteg = () => {
    const stepId = SøknadStepId.HOBBY;

    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const formValues = useStepFormValues().getStepFormValues(stepId);

    const stepStatus = useSøknadStepStatus();
    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep,
    });

    const { register, handleSubmit, getValues } = useForm<Skjemadata>({
        defaultValues: getDefaultValues(formValues, søknadState?.søknadsdata[stepId]),
    });

    const { FormSubmitGuardInfo, clearFormValues } = useFormSubmitGuard({ stepId, getValues: () => getValues() });

    const onSubmit = async (data: Skjemadata) => {
        if (!data.navn) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        setSøknadsdata({ [stepId]: { navn: data.navn } });
        await lagreSøknad();
        clearFormValues();
        navigateToNextStep(stepId);
    };

    return (
        <VStack gap="space-24">
            <FormSubmitGuardInfo />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16">
                    <Heading size="large">Navn på hobby</Heading>
                    <TextField label="Navn" {...register('navn')} />

                    <HStack gap="space-16" justify="start">
                        {canGoPrevious(stepId) && (
                            <Button type="button" variant="secondary" onClick={() => navigateToPreviousStep(stepId)}>
                                Forrige
                            </Button>
                        )}
                        <Button type="submit" disabled={isPending} loading={isPending}>
                            Neste
                        </Button>
                    </HStack>
                </VStack>
            </form>
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
