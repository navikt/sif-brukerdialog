import { FormSummary } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { useStepNavigation } from '@rammeverk/navigation';
import { StepPage } from '@rammeverk/pages';
import { getProgressSteps } from '@rammeverk/utils';

import { useSøknadFormValues } from '../../../rammeverk/consistency';
import { søknadStepConfig, SøknadStepId, stepTitles } from '../../config/søknadStepConfig';
import { useSøknadMellomlagring } from '../../hooks';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSendSøknad } from '../../hooks/useSendSøknad';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { useAppIntl } from '../../i18n';
import { getLenker } from '../../lenker';
import { InconsistencyAlert } from '../../setup/app-consistency-checker/InconsistencyAlert';
import { useAppConsistencyChecker } from '../../setup/app-consistency-checker/useAppConsistencyChecker';
import { getSøknadApiDataFromSøknad } from '../../utils/søknadsdataToSøknadApiData';

export const OppsummeringSteg = () => {
    const { text } = useAppIntl();

    const stepId = SøknadStepId.OPPSUMMERING;
    const state = useSøknadStore((s) => s.søknadState);
    const setCurrentStep = useSøknadStore((s) => s.setCurrentStep);
    const setSøknadSendt = useSøknadStore((s) => s.setSøknadSendt);
    const includedSteps = useSøknadStore((s) => s.includedSteps);
    const avbrytSøknad = useAvbrytSøknad();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { slettMellomlagring, lagreSøknad } = useSøknadMellomlagring();

    const { isPending, mutateAsync } = useSendSøknad();
    const { navigateToStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
        stepConfig: søknadStepConfig,
        getSøknadSteps: () => useSøknadStore.getState().includedSteps,
        setCurrentStep,
    });

    if (!state) {
        throw new Error('Søknadsdata mangler i oppsummering');
    }
    const { søker, søknadsdata } = state;

    const apiData = getSøknadApiDataFromSøknad({ søker, søknadsdata });
    console.log(apiData);

    const onPrevious = canGoPrevious(stepId) ? () => navigateToPreviousStep(stepId) : undefined;

    const fortsettSenere = async () => {
        await lagreSøknad();
        window.location.href = getLenker().minSide;
    };

    const onSubmit = async (evt: React.SubmitEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try {
            await mutateAsync({} as any);
            await slettMellomlagring();
            clearSøknadFormValues();
            setSøknadSendt();
        } catch (e) {
            alert(e);
        }
    };

    const { inconsistentStepId } = useAppConsistencyChecker(stepId);

    return (
        <StepPage
            documentTitle="Oppsummering"
            applicationTitle={text('application.title')}
            stepId={stepId}
            steps={getProgressSteps(includedSteps, stepTitles)}
            onStepSelect={navigateToStep}
            onResumeLater={fortsettSenere}
            onAbort={avbrytSøknad}>
            {inconsistentStepId ? <InconsistencyAlert stepId={inconsistentStepId} /> : null}
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
                        submitPending={isPending}
                        submitDisabled={!!inconsistentStepId || isPending}
                        submitLabel="Send inn søknad"
                    />
                </FormLayout.Summary>
            </form>
        </StepPage>
    );
};
