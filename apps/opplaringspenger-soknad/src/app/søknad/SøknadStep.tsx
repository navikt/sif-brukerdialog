import React from 'react';
import { soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import InvalidStepSøknadsdataInfo from '../components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { StepId } from '../types/StepId';
import { getSøknadStepConfig } from './søknadStepConfig';
import { useAppIntl } from '../i18n';

interface Props {
    stepId: StepId;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, children }) => {
    const { text, intl } = useAppIntl();

    const stepConfig = getSøknadStepConfig();

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const { index } = stepConfig[stepId];

    const steps = soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl);

    return (
        <Step
            activeStepId={stepId}
            applicationTitle={text('application.title')}
            steps={steps}
            onCancel={avbrytSøknad}
            onContinueLater={fortsettSøknadSenere}>
            <InvalidStepSøknadsdataInfo stepId={stepId} stepConfig={stepConfig} />
            {children}
        </Step>
    );
};

export default SøknadStep;
