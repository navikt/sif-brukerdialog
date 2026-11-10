import { K9Sak } from '@app/types';
import { fetchSøker, Søker } from '@navikt/sif-common-api';
import { DateRange, dateToISODate } from '@navikt/sif-common-utils';
import { appLogger } from '@sif/apm';

import {
    erSakEldreEnnEndringsperiode,
    getEndringsdato,
    getOppslagsperiode,
    getTillattEndringsperiode,
} from '../../utils/endringsperiode';
import { getSamletDateRangeForK9Saker } from '../../utils/k9SakUtils';
import { arbeidsgivereEndpoint } from '../endpoints/arbeidsgivereEndpoint';
import { sakerEndpoint } from '../endpoints/sakerEndpoint';
import { tilgangEndpoint } from '../endpoints/tilgangEndpoint';
import { hentGyldigLagretSøknadState } from './hentGyldigLagretSøknadState';
import { IngenTilgangError, mapInitialDataError } from './initialDataError';
import { InitialData } from './types';

const formaterPeriode = ({ from, to }: DateRange) => `${dateToISODate(from)}/${dateToISODate(to)}`;

/** Frontend regner med nettleserens klokke, backend med Europe/Oslo. Logges for å se om de spriker. */
const loggAvvikIEndringsperiode = (fraBackend: DateRange) => {
    const backend = formaterPeriode(fraBackend);
    const frontend = formaterPeriode(getTillattEndringsperiode(getEndringsdato()));
    if (backend !== frontend) {
        appLogger.logInfo(`fetchInitialData.avvikIEndringsperiode frontend(${frontend}) backend(${backend})`);
    }
};

/**
 * Backend har gitt tilgang, og da finnes det nøyaktig én aktuell sak.
 * Finner ikke frontend den samme saken, er frontend og backend uenige, og bruker får feilsiden.
 */
const velgSak = (saker: K9Sak[], tillattEndringsperiode: DateRange): { sak: K9Sak; oppslagsperiode: DateRange } => {
    const aktuelleSaker = saker.filter(
        (sak) => !erSakEldreEnnEndringsperiode(sak.ytelse.søknadsperioder, tillattEndringsperiode),
    );
    const samletSøknadsperiode = aktuelleSaker.length === 1 ? getSamletDateRangeForK9Saker(aktuelleSaker) : undefined;
    const oppslagsperiode = samletSøknadsperiode
        ? getOppslagsperiode(samletSøknadsperiode, tillattEndringsperiode)
        : undefined;

    if (!oppslagsperiode) {
        appLogger.logInfo(
            `fetchInitialData.fantIkkeSak antallGyldigeSaker=${saker.length} antallAktuelleSaker=${aktuelleSaker.length}`,
        );
        throw new Error('fetchInitialData: fant ikke én aktuell sak etter tilgang fra backend');
    }
    return { sak: aktuelleSaker[0], oppslagsperiode };
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
        loggAvvikIEndringsperiode(tillattEndringsperiode);

        const saker = await sakerEndpoint.fetch();
        const { sak, oppslagsperiode } = velgSak(saker, tillattEndringsperiode);
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
