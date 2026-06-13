import { Box } from '@navikt/ds-react';
import { ProgressStep } from '@navikt/sif-common-ui';
import { StepPage } from '@sif/soknad-ui/pages';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { InconsistentFormValuesMessage } from '../consistency/InconsistentFormValuesMessage';
import { useSøknadAppContext } from '../context/SøknadAppContext';
import { useCheckConsistency } from '../hooks/useCheckConsistency';
import { SøknadStepProps } from '../types';
import { buildStepPath } from '../utils/routeUtils';

/**
 * Wrapper-komponent for ett søknadssteg.
 *
 * - Henter steg-tittel fra IntlProvider via nøkkelen `step.${stepId}.title`
 * - Bygger progress-stepper fra inkluderte steg
 * - Håndterer "avbryt" (slett mellomlagring + gå til forsiden) og
 *   "fortsett senere" (lagre + naviger til Min side)
 */
export const SøknadStep = ({ stepId, children }: SøknadStepProps) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const {
        store,
        config,
        basePath,
        applicationTitle,
        resumeLaterUrl,
        versjon,
        lagreMellomlagring,
        slettMellomlagring,
    } = useSøknadAppContext();

    const includedSteps = store((s) => s.includedSteps);
    const søknadsdata = store((s) => s.søknadsdata);
    const resumeStepId = store((s) => s.resumeStepId);
    const reset = store((s) => s.reset);

    const steps: ProgressStep[] = includedSteps.map((s, index) => ({
        id: s.stepId,
        index,
        label: intl.formatMessage({ id: `step.${s.stepId}.title` }),
        completed: s.completed,
    }));

    const documentTitle = intl.formatMessage({ id: `step.${stepId}.title` });

    const inconsistentStepId = useCheckConsistency(stepId);

    const onStepSelect = (selectedStepId: string) => {
        const route = config[selectedStepId]?.route;
        if (route) {
            navigate(buildStepPath(basePath, route));
        }
    };

    const onAbort = async () => {
        await slettMellomlagring();
        reset();
        navigate('/');
    };

    const onResumeLater = async () => {
        if (resumeStepId) {
            await lagreMellomlagring({ versjon, resumeStepId, søknadsdata });
        }
        window.location.href = resumeLaterUrl;
    };

    return (
        <StepPage
            documentTitle={documentTitle}
            applicationTitle={applicationTitle}
            stepId={stepId}
            steps={steps}
            onStepSelect={onStepSelect}
            onAbort={onAbort}
            onResumeLater={onResumeLater}>
            {inconsistentStepId ? (
                <Box marginBlock="space-0 space-32">
                    <InconsistentFormValuesMessage
                        stepId={inconsistentStepId}
                        stepTitle={intl.formatMessage({ id: `step.${inconsistentStepId}.title` })}
                        onNavigateToStep={() => {
                            const route = config[inconsistentStepId]?.route;
                            if (route) navigate(buildStepPath(basePath, route));
                        }}
                    />
                </Box>
            ) : null}
            {children}
        </StepPage>
    );
};
