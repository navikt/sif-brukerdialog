import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import Step from '@navikt/sif-common-soknad-ds/lib/soknad-step/step/Step';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import { getSøknadStegConfig, StegID } from './søknadStegConfig';

interface Props {
    stegID: StegID;
    children: React.ReactNode;
}

const SøknadSteg: React.FunctionComponent<Props> = ({ stegID, children }) => {
    const intl = useIntl();
    const stegConfig = getSøknadStegConfig();
    const { dispatch } = useSøknadContext();

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const { stepTitleIntlKey, backLinkHref, previousStepRoute, pageTitleIntlKey } = stegConfig[stegID];

    return (
        <Step
            activeStepId={stegID}
            pageTitle={intlHelper(intl, pageTitleIntlKey)}
            steps={soknadStepUtils.getStepIndicatorStepsFromConfig(stegConfig, intl)}
            stepTitle={intlHelper(intl, stepTitleIntlKey)}
            backLinkHref={backLinkHref}
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

export default SøknadSteg;
