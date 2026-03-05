import { Alert, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

import { getProgressSteps } from '../../../rammeverk';
import { SøknadStepPage } from '../../../rammeverk/components/søknad-step-page/SøknadStepPage';
import { søknadStepConfig, SøknadStepId, stepTitles } from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { useAppIntl } from '../../i18n';

export const OppsummeringSteg = () => {
    const { text } = useAppIntl();

    const stepId = SøknadStepId.OPPSUMMERING;
    const søknadState = useSøknadStore((s) => s.søknadState);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const includedSteps = useSøknadStore((s) => s.includedSteps);
    const avbrytSøknad = useAvbrytSøknad();
    const { clearAllStepFormValues } = useStepFormValues();

    const { navigateToStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig: søknadStepConfig,
        getIncludedSteps: () => useSøknadStore.getState().includedSteps,
        setCurrentStep,
    });

    const onPrevious = canGoPrevious(stepId) ? () => navigateToPreviousStep(stepId) : undefined;

    const onSubmit = async () => {
        clearAllStepFormValues();
    };

    return (
        <SøknadStepPage
            documentTitle="Oppsummering"
            applicationTitle={text('application.title')}
            stepId={stepId}
            steps={getProgressSteps(includedSteps, stepTitles)}
            onStepSelect={navigateToStep}
            onAbort={avbrytSøknad}>
            <form onSubmit={onSubmit}>
                <FormLayout.Content>
                    <Alert variant="info">
                        <VStack gap="space-2">
                            <p>
                                <strong>Navn:</strong> {søknadState?.søknadsdata[SøknadStepId.PERSONALIA]?.navn}
                            </p>
                            <p>
                                <strong>E-post:</strong> {søknadState?.søknadsdata[SøknadStepId.KONTAKT]?.epost}
                            </p>
                        </VStack>
                    </Alert>
                    <FormLayout.FormButtons
                        onPrevious={onPrevious}
                        isFinalSubmit={true}
                        submitLabel="Send inn søknad"
                    />
                </FormLayout.Content>
            </form>
        </SøknadStepPage>
    );
};
