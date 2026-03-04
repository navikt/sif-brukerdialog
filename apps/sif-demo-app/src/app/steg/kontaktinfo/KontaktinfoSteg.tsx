import { VStack } from '@navikt/ds-react';

import { SøknadFooter } from '@rammeverk/components';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { SøknadStepGuard } from '../../components/SøknadStepGuard';
import {
    SøknadStepId,
    søknadStepConfig as stepConfig,
    søknadStepOrder as stepOrder,
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

    const søknadState = useSøknadStore((s) => s.søknadState);
    const setSøknadsdata = useSøknadStore((s) => s.setSøknadsdata);
    const setCurrentStepId = useSøknadStore((s) => s.setCurrentStep);
    const avbrytSøknad = useAvbrytSøknad();
    const { clearAllSteps, getStepFormValues } = useStepFormValues();

    const { lagreSøknad, isPending } = useSøknadMellomlagring();

    const stepFormValues = getStepFormValues<KontaktSkjemadata>(stepId);

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
            <SøknadStepGuard stepId={stepId} />
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
