import { FormSummary } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { getProgressSteps } from '@rammeverk/foundation';
import { useStepNavigation } from '@rammeverk/navigation';
import { StepPage } from '@rammeverk/pages';
import { useSøknadFormValues } from '@rammeverk/consistency';

import { søknadStepConfig, SøknadStepId, stepTitles } from '../../config/søknadStepConfig';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { useAppIntl } from '../../i18n';

export const OppsummeringSteg = () => {
    const { text } = useAppIntl();

    const stepId = SøknadStepId.OPPSUMMERING;
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const includedSteps = useSøknadStore((s) => s.includedSteps);
    const avbrytSøknad = useAvbrytSøknad();
    const { clearSøknadFormValues } = useSøknadFormValues();

    const { navigateToStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig: søknadStepConfig,
        getIncludedSteps: () => useSøknadStore.getState().includedSteps,
        setCurrentStep,
    });

    const onPrevious = canGoPrevious(stepId) ? () => navigateToPreviousStep(stepId) : undefined;

    const onSubmit = async () => {
        clearSøknadFormValues();
    };

    return (
        <StepPage
            documentTitle="Oppsummering"
            applicationTitle={text('application.title')}
            stepId={stepId}
            steps={getProgressSteps(includedSteps, stepTitles)}
            onStepSelect={navigateToStep}
            onAbort={avbrytSøknad}>
            <form onSubmit={onSubmit}>
                <FormLayout.Summary>
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Informasjon du har oppgitt</FormSummary.Heading>
                        </FormSummary.Header>
                    </FormSummary>
                    <FormLayout.FormButtons
                        onPrevious={onPrevious}
                        isFinalSubmit={true}
                        submitLabel="Send inn søknad"
                    />
                </FormLayout.Summary>
            </form>
        </StepPage>
    );
};
