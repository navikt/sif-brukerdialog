import React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { SoknadStepsConfig, soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import { StepID } from '../types/_StepID';

interface Props {
    stepId: StepID;
    stepConfig: SoknadStepsConfig<StepID>;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, stepConfig, children }) => {
    const intl = useIntl();

    useLogSidevisning(stepId);

    const { pageTitleIntlKey, index } = stepConfig[stepId];

    return (
        <Step
            activeStepId={stepId}
            pageTitle={intlHelper(intl, pageTitleIntlKey)}
            bannerTitle={intlHelper(intl, 'application.bannerTitle')}
            steps={soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl)}
            onCancel={() => null}
            onContinueLater={() => null}>
            {children}
        </Step>
    );
};

export default SøknadStep;
