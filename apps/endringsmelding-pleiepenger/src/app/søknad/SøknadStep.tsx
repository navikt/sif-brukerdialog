import React from 'react';
import { SoknadStepsConfig, soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { useAppIntl } from '../i18n';
import InvalidStepSøknadsdataInfo from '../modules/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import { StepId } from './config/StepId';
import { VStack } from '@navikt/ds-react';

interface Props {
    stepId: StepId;
    stepConfig: SoknadStepsConfig<StepId>;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, stepConfig, children }) => {
    const { text, intl } = useAppIntl();

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const { index } = stepConfig[stepId];

    return (
        <Step
            activeStepId={stepId}
            applicationTitle={text('application.title')}
            steps={soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl)}
            onCancel={avbrytSøknad}
            onContinueLater={fortsettSøknadSenere}>
            <InvalidStepSøknadsdataInfo stepId={stepId} stepConfig={stepConfig} />
            <VStack gap="8">{children}</VStack>
        </Step>
    );
};

export default SøknadStep;
