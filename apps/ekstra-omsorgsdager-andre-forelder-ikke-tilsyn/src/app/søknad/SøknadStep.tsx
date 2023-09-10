import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { StepId } from '../types/StepId';
import { getSøknadStepConfig } from './søknadStepConfig';
import StateInfo from '../components/state-info/StateInfo';
import InvalidStepSøknadsdataInfo from '../components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import { Step, soknadStepUtils } from '@navikt/sif-common-soknad-ds';

interface Props {
    stepId: StepId;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, children }) => {
    const intl = useIntl();

    useLogSidevisning(stepId);

    const stepConfig = getSøknadStepConfig();

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const { index } = stepConfig[stepId];

    const steps = soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl);
    const isDevMode = getEnvironmentVariable('APP_VERSION') === 'dev';

    return (
        <Step
            activeStepId={stepId}
            applicationTitle={intlHelper(intl, 'application.title')}
            steps={steps}
            onCancel={avbrytSøknad}
            onContinueLater={fortsettSøknadSenere}>
            <InvalidStepSøknadsdataInfo stepId={stepId} stepConfig={stepConfig} />
            {children}
            {isDevMode ? <StateInfo /> : null}
        </Step>
    );
};

export default SøknadStep;
