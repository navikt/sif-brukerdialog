import { useAppIntl } from '@shared/i18n';
import { Box } from '@navikt/ds-react';
import { InconsistentFormValuesMessage } from '@sif/soknad/consistency';
import { getProgressSteps } from '@sif/soknad/utils';
import { StepPage } from '@sif/soknad-ui/pages';
import { useNavigate } from 'react-router-dom';

import { søknadStepConfig } from '../config/søknadStepConfig';
import { SøknadStepId } from '../config/SøknadStepId';
import { useSøknadsflyt } from '../context/søknadContext';
import { useAvbrytSøknad } from '../hooks/useAvbrytSøknad';
import { useStepTitles } from '../hooks/useStepTitles';
import { Features } from '../../../../utils/Features';
import { useFortsettSøknadSenere } from '../hooks/useFortsettSøknadSenere';

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
    const fortsettSenere = useFortsettSøknadSenere();

    const inconsistentStepId = søknadsflyt.checkConsistency(stepId);

    return (
        <StepPage
            documentTitle={stepTitles[stepId]}
            applicationTitle={text('søknad.tittel')}
            stepId={stepId}
            steps={getProgressSteps(søknadsflyt.includedSteps, stepTitles)}
            onStepSelect={søknadsflyt.navigateToStep}
            onAbort={avbrytSøknad}
            onResumeLater={Features.useMellomlagring ? fortsettSenere : undefined}>
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
