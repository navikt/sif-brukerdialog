import React from 'react';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import { soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import InvalidStepSøknadsdataInfo from '../components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import StateInfo from '../components/state-info/StateInfo';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { useAppIntl } from '../i18n';
import { StepId } from '../types/StepId';
import { getSøknadStepConfig } from './søknadStepConfig';
import { useSøknadContext } from './context/hooks/useSøknadContext';

interface Props {
    stepId: StepId;
    children: React.ReactNode;
}

const SøknadStep: React.FC<Props> = ({ stepId, children }) => {
    const {
        state: { søknadsdata },
    } = useSøknadContext();
    const { text, intl } = useAppIntl();

    useLogSidevisning(stepId);

    const stepConfig = getSøknadStepConfig(søknadsdata);

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const { index } = stepConfig[stepId];

    const steps = soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl);
    const isDevMode = getEnvironmentVariable('APP_VERSION') === 'dev';

    return (
        <Step
            activeStepId={stepId}
            applicationTitle={text('application.title')}
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
