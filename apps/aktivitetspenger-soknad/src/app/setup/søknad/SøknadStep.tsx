import { useAppIntl } from '@app/i18n';
import { Box } from '@navikt/ds-react';
import { InconsistentFormValuesMessage } from '@sif/soknad/consistency';
import { getProgressSteps } from '@sif/soknad/utils';
import { StepPage } from '@sif/soknad-ui/pages';
import { useNavigate } from 'react-router-dom';

import { søknadStepConfig } from '../config/søknadStepConfig';
import { SøknadStepId } from '../config/SøknadStepId';
import { useSøknadsflyt } from '../context/søknadContext';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useSøknadMellomlagring } from '../hooks/useSøknadMellomlagring';
import { useStepTitles } from '../hooks/useStepTitles';

interface Props {
    stepId: SøknadStepId;
    children: React.ReactNode;
}

export const SøknadStep = ({ stepId, children }: Props) => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const søknadsflyt = useSøknadsflyt();

    const stepTitles = useStepTitles();

    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad } = useSøknadMellomlagring();

    const fortsettSenere = async () => {
        await lagreSøknad();
        window.location.href = 'https://www.nav.no/minside';
    };

    const inconsistentStepId = søknadsflyt.checkConsistency(stepId);

    return (
        <StepPage
            documentTitle={stepTitles[stepId]}
            applicationTitle={text('application.title')}
            stepId={stepId}
            steps={getProgressSteps(søknadsflyt.includedSteps, stepTitles)}
            onStepSelect={søknadsflyt.navigateToStep}
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
