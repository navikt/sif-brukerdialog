import { VStack } from '@navikt/ds-react';

import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { useFormSubmitGuard } from '../../hooks/useFormSubmitGuard';
import {
    SøknadStepId,
    søknadStepConfig as stepConfig,
    søknadStepOrder as stepOrder,
} from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../../hooks/useSøknadMellomlagring';
import { useSøknadStepStatus } from '../../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { PersonaliaSøknadsdata } from '../../types/Søknadsdata';
import PersonaliaForm, { PersonaliaSkjemadata } from './PersonaliaForm';
import { useForm } from 'react-hook-form';

const getDefaultValues = (
    stepFormValues: Partial<PersonaliaSkjemadata> | undefined,
    søknadsdata?: PersonaliaSøknadsdata,
): Partial<PersonaliaSkjemadata> => {
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
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStepId = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const stepFormValues = useStepFormValues().getStepFormValues(stepId);

    const stepStatus = useSøknadStepStatus();

    const { navigateToNextStep } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep: setCurrentStepId,
    });

    const hookForm = useForm<PersonaliaSkjemadata>({
        defaultValues: getDefaultValues(stepFormValues, søknadState?.søknadsdata[stepId]),
    });

    const { getValues } = hookForm;

    const { FormSubmitGuardInfo, clearFormValues } = useFormSubmitGuard({
        stepId: stepId,
        getValues: () => getValues(),
    });

    const onSubmit = async (data: PersonaliaSkjemadata) => {
        if (!data.navn || !data.harHobby) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        setSøknadsdata({ [stepId]: { navn: data.navn, harHobby: data.harHobby } });
        await lagreSøknad();
        clearFormValues();
        navigateToNextStep(stepId);
    };

    return (
        <VStack gap="space-24">
            <FormSubmitGuardInfo />
            <PersonaliaForm hookForm={hookForm} isPending={isPending} onSubmit={onSubmit} />
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
