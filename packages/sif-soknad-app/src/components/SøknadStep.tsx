import { ProgressStep } from '@navikt/sif-common-ui';
import { StepPage } from '@sif/soknad-ui/pages';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { useSøknadAppContext } from '../context/SøknadAppContext';
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
        lagreMellomlagringNow,
        slettMellomlagring,
    } = useSøknadAppContext();

    const includedSteps = store((s) => s.includedSteps);
    const søknadsdata = store((s) => s.søknadsdata);
    const currentStepId = store((s) => s.currentStepId);
    const reset = store((s) => s.reset);

    const steps: ProgressStep[] = includedSteps.map((s, index) => ({
        id: s.stepId,
        index,
        label: intl.formatMessage({ id: `step.${s.stepId}.title` }),
        completed: s.completed,
    }));

    const documentTitle = intl.formatMessage({ id: `step.${stepId}.title` });

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
        if (currentStepId) {
            await lagreMellomlagringNow({ versjon, currentStepId, søknadsdata });
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
            {children}
        </StepPage>
    );
};
