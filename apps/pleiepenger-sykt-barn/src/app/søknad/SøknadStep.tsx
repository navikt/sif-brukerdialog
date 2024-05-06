import React from 'react';
import { useAppIntl } from '@i18n/index';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SoknadStepsConfig, soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import { StepID } from '../types/StepID';

interface Props {
    stepId: StepID;
    stepConfig: SoknadStepsConfig<StepID>;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, stepConfig, children }) => {
    const { intl } = useAppIntl();

    useLogSidevisning(stepId);

    const { index } = stepConfig[stepId];

    return (
        <Step
            activeStepId={stepId}
            applicationTitle={intlHelper(intl, 'application.title')}
            steps={soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl)}
            onCancel={() => null}
            onContinueLater={() => null}>
            {children}
        </Step>
    );
};

export default SøknadStep;
