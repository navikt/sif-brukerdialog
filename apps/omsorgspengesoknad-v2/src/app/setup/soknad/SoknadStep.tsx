import { useAppIntl } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { Box } from '@navikt/ds-react';
import { InconsistentFormValuesMessage } from '@sif/soknad/consistency';
import { getProgressSteps } from '@sif/soknad/utils';
import { StepPage } from '@sif/soknad-ui/pages';
import { useNavigate } from 'react-router-dom';

import { søknadStepConfig } from '../config/soknadStepConfig';
import { SøknadStepId } from '../config/SoknadStepId';
import { useSøknadsflyt } from '../context/soknadContext';
import { useAvbrytSøknad } from '../hooks/useAvbrytSoknad';
import { useSøknadMellomlagring } from '../hooks/useSoknadMellomlagring';
import { useStepTitles } from '../hooks/useStepTitles';

interface Props {
    stepId: SøknadStepId;
    children: React.ReactNode;
}

export const SøknadStep = ({ stepId, children }: Props) => {
    const { text } = useAppIntl();
    const lenker = useLenker();
    const navigate = useNavigate();
    const søknadsflyt = useSøknadsflyt();

    const stepTitles = useStepTitles();

    const avbrytSøknad = useAvbrytSøknad();
    const { lagreSøknad } = useSøknadMellomlagring();

    const fortsettSenere = async () => {
        await lagreSøknad();
        window.location.href = lenker.minSide;
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
