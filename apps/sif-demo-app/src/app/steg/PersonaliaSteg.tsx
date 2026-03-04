import { Button, Heading, Radio, RadioGroup, TextField, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';

import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { useFormSubmitGuard } from '../components/FormSubmitGuard';
import { SøknadStepId, søknadStepConfig as stepConfig, søknadStepOrder as stepOrder } from '../config/søknadStepConfig';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../hooks/useSøknadMellomlagring';
import { useSøknadStepStatus } from '../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../hooks/useSøknadStore';
import { PersonaliaSøknadsdata } from '../types/Søknadsdata';

interface Skjemadata {
    navn: string;
    harHobby?: 'ja' | 'nei';
}

const getDefaultValues = (
    stepFormValues: Partial<Skjemadata> | undefined,
    søknadsdata?: PersonaliaSøknadsdata,
): Partial<Skjemadata> => {
    if (stepFormValues) {
        return stepFormValues;
    }
    if (søknadsdata) {
        return {
            navn: søknadsdata.navn,
            harHobby: søknadsdata.harHobby,
        };
    }
    return {};
};

export const PersonaliaSteg = () => {
    const stepId = SøknadStepId.PERSONALIA;
    const søknadState = useSøknadStore((s) => s.søknadState);
    const submitSteg = useSøknadStore((s) => s.submitStep);
    const setCurrentStepId = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const formValues = useStepFormValues().getStepFormValues(stepId);

    const stepStatus = useSøknadStepStatus();
    const { navigateToNextStep } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep: setCurrentStepId,
    });

    const { register, handleSubmit, watch, setValue, getValues } = useForm<Skjemadata>({
        defaultValues: getDefaultValues(formValues, søknadState?.søknadsdata[stepId]),
    });

    const harHobby = watch('harHobby');

    const { FormSubmitGuardInfo, clearFormValues } = useFormSubmitGuard({
        stepId: stepId,
        getValues: () => getValues(),
    });

    const onSubmit = async (data: Skjemadata) => {
        if (!data.navn || !data.harHobby) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        submitSteg({ [stepId]: { navn: data.navn, harHobby: data.harHobby } });
        await lagreSøknad();
        clearFormValues();
        navigateToNextStep(stepId);
    };

    return (
        <VStack gap="space-24">
            <FormSubmitGuardInfo />
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack gap="space-16">
                    <Heading size="large">Personalia</Heading>
                    <TextField label="Navn" {...register('navn')} />
                    <RadioGroup
                        legend="Har du hobby?"
                        value={harHobby}
                        onChange={(value) => setValue('harHobby', value)}>
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                    </RadioGroup>
                    <div>
                        <Button type="submit" disabled={isPending} loading={isPending}>
                            Neste
                        </Button>
                    </div>
                </VStack>
            </form>
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
