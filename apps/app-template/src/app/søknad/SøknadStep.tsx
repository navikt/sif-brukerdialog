import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import Step from '@navikt/sif-common-soknad-ds/lib/soknad-step/step/Step';
import InvalidStepSøknadsdataInfo from '../components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import StateInfo from '../components/state-info/StateInfo';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { StepId } from '../types/StepId';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import { getSøknadStepConfig } from './søknadStepConfig';

interface Props {
    stepId: StepId;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, children }) => {
    const intl = useIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const stepConfig = getSøknadStepConfig(søknadsdata);
    const { pageTitleIntlKey, index } = stepConfig[stepId];

    return (
        <Step
            activeStepId={stepId}
            pageTitle={intlHelper(intl, pageTitleIntlKey)}
            bannerTitle={intlHelper(intl, 'application.bannerTitle')}
            steps={soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl)}
            onCancel={avbrytSøknad}
            onContinueLater={fortsettSøknadSenere}>
            <InvalidStepSøknadsdataInfo stepId={stepId} stepConfig={stepConfig} />
            {children}
            <StateInfo />
        </Step>
    );
};

export default SøknadStep;
