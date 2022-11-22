import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import Step from '@navikt/sif-common-soknad-ds/lib/soknad-step/step/Step';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { StepId } from '../types/StepId';
import actionsCreator from './context/action/actionCreator';
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

    const stepConfig = getSøknadStepConfig(søknadsdata);
    const { dispatch } = useSøknadContext();

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const { index, previousStepRoute, pageTitleIntlKey } = stepConfig[stepId];

    return (
        <Step
            activeStepId={stepId}
            pageTitle={intlHelper(intl, pageTitleIntlKey)}
            steps={soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl)}
            onCancel={avbrytSøknad}
            onContinueLater={fortsettSøknadSenere}
            onBackClick={
                previousStepRoute
                    ? () => {
                          if (previousStepRoute) {
                              dispatch(actionsCreator.setSøknadRoute(previousStepRoute));
                              dispatch(actionsCreator.requestLagreSøknad());
                          }
                      }
                    : undefined
            }>
            {children}
        </Step>
    );
};

export default SøknadStep;
