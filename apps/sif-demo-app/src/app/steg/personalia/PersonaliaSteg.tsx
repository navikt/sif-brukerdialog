import { Alert, Link, VStack } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { SøknadStepGuard } from '../../components/SøknadStepGuard';
import {
    SøknadStepId,
    søknadStepConfig as stepConfig,
    søknadStepOrder as stepOrder,
    stepTitles,
} from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../../hooks/useSøknadMellomlagring';
import { useSøknadStepStatus } from '../../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { PersonaliaSøknadsdata } from '../../types/Søknadsdata';
import PersonaliaForm, { PersonaliaSkjemadata } from './PersonaliaForm';

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
    const navigate = useNavigate();
    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStepId = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();
    const { clearAllSteps } = useStepFormValues();

    const stepFormValues = useStepFormValues().getStepFormValues(stepId) as Partial<PersonaliaSkjemadata> | undefined;

    const stepStatus = useSøknadStepStatus();

    const { navigateToNextStep } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep: setCurrentStepId,
    });

    const defaultValues = getDefaultValues(stepFormValues, søknadState?.søknadsdata[stepId]);

    const handleOnSubmit = async (data: PersonaliaSkjemadata) => {
        if (!data.navn || !data.harHobby) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        setSøknadsdata({ [stepId]: { navn: data.navn, harHobby: data.harHobby } });
        await lagreSøknad();
        clearAllSteps();
        navigateToNextStep(stepId);
    };

    return (
        <VStack gap="space-24">
            <SøknadStepGuard stepId={stepId}>
                {(invalidStepId) =>
                    invalidStepId && (
                        <Alert variant="warning">
                            Du har ulagrede endringer i {stepTitles[invalidStepId as SøknadStepId]}.{' '}
                            <Link
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/soknad/${stepConfig[invalidStepId as SøknadStepId].route}`);
                                }}>
                                Gå tilbake
                            </Link>
                        </Alert>
                    )
                }
            </SøknadStepGuard>
            <PersonaliaForm defaultValues={defaultValues} isPending={isPending} onSubmit={handleOnSubmit} />
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
