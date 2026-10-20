import { useSøknadContext } from '@app/hooks';
import { EndringType } from '@app/types';
import { useAnalyticsInstance } from '@navikt/sif-common-analytics';
import { EndringsmeldingPsbApp } from '@sif/app-register';

import actionsCreator from '../søknad/context/action/actionCreator';

export const useStartSøknad = () => {
    const { logSoknadStartet } = useAnalyticsInstance();
    const {
        state: { sak },
        dispatch,
    } = useSøknadContext();

    const startSøknad = (hvaSkalEndres: EndringType[] = [EndringType.arbeidstid]) => {
        logSoknadStartet(EndringsmeldingPsbApp.navn);
        dispatch(actionsCreator.startSøknad(sak, hvaSkalEndres));
    };

    return {
        startSøknad,
    };
};
