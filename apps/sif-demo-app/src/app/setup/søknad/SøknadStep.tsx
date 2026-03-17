import { Box } from '@navikt/ds-react';
import { InconsistentFormValuesMessage } from '@sif/soknad/consistency';
import { StepPage } from '@sif/soknad/pages';
import { getProgressSteps } from '@sif/soknad/utils';
import { useNavigate } from 'react-router-dom';

import { useAppIntl } from '../../i18n';
import { getLenker } from '../../lenker';
import { useSøknadFlow } from '../context/søknadContext';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../hooks/useSøknadMellomlagring';
import { søknadStepConfig, SøknadStepId, stepTitles } from './søknadStepConfig';

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
export const SøknadStep = ({ stepId, children }: Props) => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const ctx = useSøknadFlow();
    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad } = useSøknadMellomlagring();

    const fortsettSenere = async () => {
        await lagreSøknad();
        window.location.href = getLenker().minSide;
    };

    // Consistency-sjekk
    const inconsistentStepId = ctx.checkConsistency(stepId);

    return (
        <StepPage
            documentTitle={stepTitles[stepId]}
            applicationTitle={text('application.title')}
            stepId={stepId}
            steps={getProgressSteps(ctx.includedSteps, stepTitles)}
            onStepSelect={ctx.navigateToStep}
            onAbort={avbrytSøknad}
            onResumeLater={fortsettSenere}>
            {inconsistentStepId ? (
                <Box marginBlock="space-0 space-32">
                    <InconsistentFormValuesMessage
                        stepId={inconsistentStepId}
                        stepTitle={stepTitles[inconsistentStepId]}
                        onNavigateToStep={() => navigate(`/soknad/${søknadStepConfig[inconsistentStepId].route}`)}
                    />
                </Box>
            ) : null}
            {children}
        </StepPage>
    );
};
