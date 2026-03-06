import { FormSummary } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { getProgressSteps } from '@rammeverk';
import { StepPage } from '@rammeverk/components/step-page/StepPage';
import { useStepFormValues, useStepNavigation } from '@rammeverk/state';

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
                            <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>Navn</FormSummary.Label>
                                <FormSummary.Value>
                                    {søknadState?.søknadsdata[SøknadStepId.PERSONALIA]?.navn}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
                    </FormSummary>
                    {søknadState?.søknadsdata[SøknadStepId.HOBBY] && (
                        <FormSummary>
                            <FormSummary.Header>
                                <FormSummary.Heading level="2">Hobby</FormSummary.Heading>
                            </FormSummary.Header>
                            <FormSummary.Answers>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Hobby</FormSummary.Label>
                                    <FormSummary.Value>
                                        {søknadState?.søknadsdata[SøknadStepId.HOBBY]?.navn}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            </FormSummary.Answers>
                        </FormSummary>
                    )}
                    <FormSummary>
                        <FormSummary.Header>
                            <FormSummary.Heading level="2">Kontaktinformasjon</FormSummary.Heading>
                        </FormSummary.Header>
                        <FormSummary.Answers>
                            <FormSummary.Answer>
                                <FormSummary.Label>E-post</FormSummary.Label>
                                <FormSummary.Value>
                                    {søknadState?.søknadsdata[SøknadStepId.KONTAKT]?.epost}
                                </FormSummary.Value>
                            </FormSummary.Answer>
                        </FormSummary.Answers>
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
