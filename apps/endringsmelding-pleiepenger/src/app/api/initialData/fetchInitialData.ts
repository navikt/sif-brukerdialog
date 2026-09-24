import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { DateRange } from '@navikt/sif-common-utils';

import { arbeidsgivereEndpoint } from '../endpoints/arbeidsgivereEndpoint';
import { sakerEndpoint } from '../endpoints/sakerEndpoint';
import { hentGyldigLagretSøknadState } from './hentGyldigLagretSøknadState';
import { mapInitialDataError } from './initialDataError';
import { loggIngenSaker } from './initialDataValidering';
import { getTilgangKontroll } from './tilgangKontroll';
import { InitialData } from './types';

/**
 * Henter alt appen trenger for å starte en endringsmelding.
 *
 * Stegene kjøres i rekkefølge fordi hvert steg er avhengig av resultatet fra det forrige.
 * Feiler noe — teknisk eller fordi bruker ikke kan bruke søknaden — oversettes det ett sted,
 * i mapInitialDataError, til en tilstand appen kan vise.
 */
export const fetchInitialData = async (tillattEndringsperiode: DateRange): Promise<InitialData> => {
    let søker: Søker | undefined;

    try {
        const [søkerResult, sakerResult] = await Promise.all([fetchSøker(), sakerEndpoint.fetch()]);
        søker = søkerResult;

        const { k9Saker: sakerInnenforEndringsperiode, eldreSaker: sakerFørEndringsperiode } = sakerResult;
        loggIngenSaker(sakerInnenforEndringsperiode, sakerFørEndringsperiode);

        const { sak, arbeidsgivere } = await getTilgangKontroll()(
            sakerInnenforEndringsperiode,
            sakerFørEndringsperiode,
            tillattEndringsperiode,
            arbeidsgivereEndpoint.fetch,
        );

        const k9saker = [sak];

        const lagretSøknadState = await hentGyldigLagretSøknadState({
            søker,
            k9saker,
            arbeidsgivere,
            tillattEndringsperiode,
        });

        return {
            søker,
            arbeidsgivere,
            k9saker,
            antallSakerFørEndringsperiode: sakerFørEndringsperiode.length,
            lagretSøknadState,
        };
    } catch (error) {
        return Promise.reject(mapInitialDataError(error, søker));
    }
};
