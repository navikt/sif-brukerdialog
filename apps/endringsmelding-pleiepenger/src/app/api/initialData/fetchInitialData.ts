import { IngenTilgangÅrsak, K9Sak } from '@app/types';
import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { DateRange } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';

import { erSakEldreEnnEndringsperiode, getOppslagsperiode } from '../../utils/endringsperiode';
import { getSamletDateRangeForK9Saker } from '../../utils/k9SakUtils';
import { arbeidsgivereEndpoint } from '../endpoints/arbeidsgivereEndpoint';
import { sakerEndpoint } from '../endpoints/sakerEndpoint';
import { tilgangEndpoint } from '../endpoints/tilgangEndpoint';
import { hentGyldigLagretSøknadState } from './hentGyldigLagretSøknadState';
import { IngenTilgangError, mapInitialDataError } from './initialDataError';
import { InitialData } from './types';

/**
 * Backend har gitt tilgang, og da finnes det nøyaktig én aktuell sak.
 * Finner ikke frontend den samme saken, er frontend og backend uenige. Er det fordi
 * frontend ikke kan lese formatet på saken, får bruker melding om det. Ellers får bruker feilsiden.
 */
const velgSak = (
    saker: K9Sak[],
    antallUgyldige: number,
    tillattEndringsperiode: DateRange,
): { sak: K9Sak; oppslagsperiode: DateRange } => {
    const aktuelleSaker = saker.filter(
        (sak) => !erSakEldreEnnEndringsperiode(sak.ytelse.søknadsperioder, tillattEndringsperiode),
    );
    const sak = aktuelleSaker.length === 1 ? aktuelleSaker[0] : undefined;
    const samletSøknadsperiode = sak && getSamletDateRangeForK9Saker([sak]);
    const oppslagsperiode = samletSøknadsperiode && getOppslagsperiode(samletSøknadsperiode, tillattEndringsperiode);

    if (!sak || !oppslagsperiode) {
        appLogger.logInfo(
            `fetchInitialData.fantIkkeSak antallGyldigeSaker=${saker.length} antallAktuelleSaker=${aktuelleSaker.length} antallUgyldigeSaker=${antallUgyldige}`,
        );
        if (aktuelleSaker.length === 0 && antallUgyldige > 0) {
            throw new IngenTilgangError([IngenTilgangÅrsak.harUgyldigK9FormatSak]);
        }
        throw new Error('fetchInitialData: fant ikke én aktuell sak etter tilgang fra backend');
    }
    return { sak, oppslagsperiode };
};

/**
 * Henter alt appen trenger for å starte en endringsmelding.
 *
 * Backend avgjør om bruker kan bruke endringsmeldingen. Feiler noe, teknisk eller fordi bruker
 * ikke har tilgang, oversettes det i mapInitialDataError til en tilstand appen kan vise.
 */
export const fetchInitialData = async (): Promise<InitialData> => {
    let søker: Søker | undefined;

    try {
        const [søkerResult, tilgang] = await Promise.all([fetchSøker(), tilgangEndpoint.fetch()]);
        søker = søkerResult;

        if (!tilgang.kanBruke) {
            throw new IngenTilgangError(tilgang.årsaker);
        }

        const { tillattEndringsperiode } = tilgang;
        const { saker, antallUgyldige } = await sakerEndpoint.fetch();
        const { sak, oppslagsperiode } = velgSak(saker, antallUgyldige, tillattEndringsperiode);
        const arbeidsgivere = await arbeidsgivereEndpoint.fetch(oppslagsperiode);
        const k9saker = [sak];

        const lagretSøknadState = await hentGyldigLagretSøknadState({
            søker,
            k9saker,
            arbeidsgivere,
            tillattEndringsperiode,
        });

        return { søker, arbeidsgivere, k9saker, tillattEndringsperiode, lagretSøknadState };
    } catch (error) {
        return Promise.reject(mapInitialDataError(error, søker));
    }
};
