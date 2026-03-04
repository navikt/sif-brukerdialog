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
import { useSøknadStepStatus } from '../../hooks/useSøknadStepStatus';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { KontaktSøknadsdata } from '../../types/Søknadsdata';
import { useSøknadMellomlagring } from '../../hooks';
import KontaktinfoForm, { KontaktSkjemadata } from './KontaktinfoForm';

const getDefaultValues = (
    stepFormValues: Partial<KontaktSkjemadata> | undefined,
    søknadsdata?: KontaktSøknadsdata,
): Partial<KontaktSkjemadata> => {
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
    const navigate = useNavigate();

    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStepId = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { clearAllSteps } = useStepFormValues();

    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const stepFormValues = useStepFormValues().getStepFormValues(stepId) as Partial<KontaktSkjemadata> | undefined;

    const stepStatus = useSøknadStepStatus();
    const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig,
        stepOrder,
        stepStatus,
        setCurrentStep: setCurrentStepId,
    });

    const defaultValues = getDefaultValues(stepFormValues, søknadState?.søknadsdata[stepId]);

    const onSubmit = async (data: KontaktSkjemadata) => {
        setSøknadsdata({ [stepId]: { epost: data.epost } });
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
            <KontaktinfoForm
                defaultValues={defaultValues}
                isPending={isPending}
                onSubmit={onSubmit}
                canGoPrevious={canGoPrevious(stepId)}
                onPrevious={() => navigateToPreviousStep(stepId)}
            />
            <SøknadFooter onAvbryt={avbrytSøknad} />
        </VStack>
    );
};
