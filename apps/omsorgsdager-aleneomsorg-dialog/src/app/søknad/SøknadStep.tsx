import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { Step, soknadStepUtils } from '@navikt/sif-common-soknad-ds';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { StepId } from '../types/StepId';
import { getSøknadStepConfig } from './søknadStepConfig';
import StateInfo from '../components/state-info/StateInfo';
import InvalidStepSøknadsdataInfo from '../components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';

interface Props {
    stepId: StepId;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, children }) => {
    const intl = useIntl();

    useLogSidevisning(stepId);

    const stepConfig = getSøknadStepConfig();

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const { pageTitleIntlKey, index } = stepConfig[stepId];

    const steps = soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl);
    const isDevMode = getEnvironmentVariable('APP_VERSION') === 'dev';

    return (
        <Step
            activeStepId={stepId}
            pageTitle={intlHelper(intl, pageTitleIntlKey)}
            bannerTitle={intlHelper(intl, 'application.bannerTitle')}
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
