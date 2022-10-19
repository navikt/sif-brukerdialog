import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import Step from '@navikt/sif-common-soknad-ds/lib/soknad-step/step/Step';
import actionsCreator from './context/action/actionCreator';
import { useSøknadContext } from './context/hooks/useSøknadContext';
import { SøknadRoutes } from './SøknadRoutes';
import { getSøknadStegConfig, StegID } from './søknadStegConfig';

interface Props {
    stegID: StegID;
    children: React.ReactNode;
}

const getPreviousRoute = (steg: StegID): SøknadRoutes | undefined => {
    switch (steg) {
        case StegID.BARN:
            return undefined;
        case StegID.ARBEID:
            return SøknadRoutes.BARN;
        case StegID.OPPLÆRING:
            return SøknadRoutes.ARBEID;
        case StegID.OPPSUMMERING:
            return SøknadRoutes.OPPLÆRING;
    }
    return undefined;
};

const SøknadSteg: React.FunctionComponent<Props> = ({ stegID, children }) => {
    const intl = useIntl();
    const soknadStepsConfig = getSøknadStegConfig();
    const { dispatch } = useSøknadContext();

    const { stepTitleIntlKey, backLinkHref } = soknadStepsConfig[stegID];

    return (
        <Step
            activeStepId={stegID}
            pageTitle="Sidetittel"
            steps={soknadStepUtils.getStepIndicatorStepsFromConfig(soknadStepsConfig, intl)}
            stepTitle={intlHelper(intl, stepTitleIntlKey)}
            backLinkHref={backLinkHref}
            onBackClick={() => {
                const previousRoute = getPreviousRoute(stegID);
                if (previousRoute) {
                    dispatch(actionsCreator.setSøknadRoute(previousRoute));
                    dispatch(actionsCreator.requestLagreSøknad());
                }
            }}>
            {children}
        </Step>
    );
};

export default SøknadSteg;
