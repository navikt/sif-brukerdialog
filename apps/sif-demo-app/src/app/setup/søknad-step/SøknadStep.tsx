import { StepPage } from '@rammeverk/pages';
import { getProgressSteps } from '@rammeverk/utils';

import { SøknadStepId, stepTitles } from '../../config/søknadStepConfig';
import { useSøknadContext } from '../../context/søknadContext';
import { useAvbrytSøknad } from '../../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../../hooks/useSøknadMellomlagring';
import { useSøknadStore } from '../../hooks/useSøknadStore';
import { useAppIntl } from '../../i18n';
import { getLenker } from '../../lenker';
import { InconsistencyAlert } from '../app-consistency-checker/InconsistencyAlert';

interface Props {
    stepId: SøknadStepId;
    children: React.ReactNode;
}

/**
 * Container for søknadssteg.
 * Setter opp page-layout, navigasjon og consistency-sjekk.
 *
 * Stegene selv håndterer sin submit-logikk via useStepSubmit hook.
 */
export function SøknadStep({ stepId, children }: Props) {
    const { text } = useAppIntl();
    const ctx = useSøknadContext();
    const includedSteps = useSøknadStore((s) => s.includedSteps);
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad } = useSøknadMellomlagring();

    const fortsettSenere = async () => {
        await lagreSøknad();
        window.location.href = getLenker().minSide;
    };

    // Consistency-sjekk
    const inconsistentStepId = ctx.checkConsistency(stepId) as SøknadStepId | undefined;

    return (
        <StepPage
            documentTitle={stepTitles[stepId]}
            applicationTitle={text('application.title')}
            stepId={stepId}
            steps={getProgressSteps(includedSteps, stepTitles)}
            onStepSelect={ctx.navigateToStep}
            onAbort={avbrytSøknad}
            onResumeLater={fortsettSenere}>
            {inconsistentStepId ? <InconsistencyAlert stepId={inconsistentStepId} /> : null}
            {children}
        </StepPage>
    );
}
