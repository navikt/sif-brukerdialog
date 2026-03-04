import { Alert, Link } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';

import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { SøknadStepGuard } from '../../components/SøknadStepGuard';
import {
    søknadStepOrder as stepOrder,
    søknadStepConfig as stepConfig,
    SøknadStepId,
    stepTitles,
} from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadStepStatus } from '../../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { HobbySøknadsdata } from '../../types/Søknadsdata';
import { useSøknadMellomlagring } from '../../hooks';
import SøknadStep from '../../../rammeverk/components/SøknadStep';
import HobbyForm, { HobbySkjemadata } from './HobbyForm';

const getDefaultValues = (
    stepFormValues: Partial<HobbySkjemadata> | undefined,
    søknadsdata?: HobbySøknadsdata,
): Partial<HobbySkjemadata> => {
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
    const navigate = useNavigate();

    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad, isPending } = useSøknadMellomlagring();
    const { clearAllSteps } = useStepFormValues();

    const stepFormValues = useStepFormValues().getStepFormValues(stepId) as Partial<HobbySkjemadata> | undefined;

    const stepStatus = useSøknadStepStatus();

    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep,
    });

    const defaultValues = getDefaultValues(stepFormValues, søknadState?.søknadsdata[stepId]);

    const onSubmit = async (data: HobbySkjemadata) => {
        if (!data.navn) {
            alert('Vennligst fyll ut alle feltene før du går videre.');
            return;
        }
        setSøknadsdata({ [stepId]: { navn: data.navn } });
        await lagreSøknad();
        clearAllSteps();
        navigateToNextStep(stepId);
    };

    return (
        <SøknadStep title={stepTitles[stepId]} stepId={stepId}>
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
            <HobbyForm
                defaultValues={defaultValues}
                isPending={isPending}
                onSubmit={onSubmit}
                canGoPrevious={canGoPrevious(stepId)}
                onPrevious={() => navigateToPreviousStep(stepId)}
            />
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </SøknadStep>
    );
};
