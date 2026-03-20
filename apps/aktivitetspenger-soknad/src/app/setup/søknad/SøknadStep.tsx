import { Box } from '@navikt/ds-react';
import { InconsistentFormValuesMessage } from '@sif/soknad/consistency';
import { StepPage } from '@sif/soknad/pages';
import { getProgressSteps } from '@sif/soknad/utils';
import { useNavigate } from 'react-router-dom';

import { useAppIntl } from '../../i18n';
import { søknadStepConfig, SøknadStepId, stepTitles } from '../config/søknadStepConfig';
import { useSøknadFlow } from '../context/søknadContext';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../hooks/useSøknadMellomlagring';

interface Props {
    stepId: SøknadStepId;
    children: React.ReactNode;
}

export const SøknadStep = ({ stepId, children }: Props) => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const ctx = useSøknadFlow();

    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad } = useSøknadMellomlagring();

    const fortsettSenere = async () => {
        await lagreSøknad();
        window.location.href = 'https://www.nav.no/minside';
    };

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
