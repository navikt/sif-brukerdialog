import { useSøknadContext } from '@hooks';
import { EndringsmeldingPsbApp } from '@navikt/sif-app-register';
import { useAnalyticsInstance } from '@navikt/sif-common-analytics';
import { EndringType } from '@types';

import actionsCreator from '../søknad/context/action/actionCreator';

export const useStartSøknad = () => {
    const { logSoknadStartet, logInfo } = useAnalyticsInstance();
    const {
        state: { sak, antallSakerFørEndringsperiode },
        dispatch,
    } = useSøknadContext();

    const startSøknad = (hvaSkalEndres: EndringType[] = [EndringType.arbeidstid]) => {
        logSoknadStartet(EndringsmeldingPsbApp.navn);
        logInfo({
            antallAktiviteterSomKanEndres: sak.utledet.aktiviteterSomKanEndres.length,
            erArbeidstaker: sak.arbeidsaktiviteter.arbeidstakerAktiviteter.length > 0,
            erFrilanser: sak.arbeidsaktiviteter.frilanser !== undefined,
            arbeidsgivereIkkeISak: sak.arbeidsgivereIkkeISak.length,
            arbeidsgivereIkkeIAAreg: sak.arbeidsaktivitetMedUkjentArbeidsgiver.length,
            antallSakerFørEndringsperiode,
        });
        dispatch(actionsCreator.startSøknad(sak, hvaSkalEndres));
    };

    return {
        startSøknad,
    };
};
