import { useAnalyticsInstance } from '@navikt/sif-common-analytics';
import { useNavigate } from 'react-router-dom';

import { getSøknadStepRoute } from '../søknad/config/SøknadRoutes';
import { EndringStepId } from '../søknad/config/StepId';
import actionsCreator from '../søknad/context/action/actionCreator';
import { useSøknadContext } from './useSøknadContext';

export const useEndreFraOppsummering = () => {
    const {
        state: { valgteEndringer },
        dispatch,
    } = useSøknadContext();
    const navigate = useNavigate();
    const { logEvent } = useAnalyticsInstance();

    const endre = (steg: EndringStepId) => {
        if (valgteEndringer[steg] === false) {
            logEvent('leggTilEndring', { steg });
        }
        dispatch(actionsCreator.leggTilValgtEndring(steg));
        dispatch(actionsCreator.requestLagreSøknad());
        /** Venter til søknadSteps er oppdatert, slik at steget er tilgjengelig i routeren */
        setTimeout(() => {
            navigate(getSøknadStepRoute(steg));
        });
    };

    return { endre };
};
