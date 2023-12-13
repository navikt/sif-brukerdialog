import React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { soknadStepUtils, Step } from '@navikt/sif-common-soknad-ds';
import InvalidStepSøknadsdataInfo from '../components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { StepId } from '../types/StepId';
import { getSøknadStepConfig } from './søknadStepConfig';

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

    return (
        <Step
            activeStepId={stepId}
            applicationTitle={intlHelper(intl, 'application.title')}
            steps={steps}
            onCancel={avbrytSøknad}
            onContinueLater={fortsettSøknadSenere}>
            <InvalidStepSøknadsdataInfo stepId={stepId} stepConfig={stepConfig} />
            {children}
        </Step>
    );
};

export default SøknadStep;
